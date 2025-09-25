# Better-Me Architecture Guide 🏗️

## Overview

Better-Me is a desktop application built with Electron, React, and TypeScript, designed to provide a gentle, inclusive self-improvement experience. This document outlines the technical architecture and design decisions.

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Better-Me Application                    │
├─────────────────────────────────────────────────────────────┤
│  Electron Main Process                                      │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │   Window        │    │   Menu/System   │                │
│  │   Management    │    │   Integration   │                │
│  └─────────────────┘    └─────────────────┘                │
├─────────────────────────────────────────────────────────────┤
│  Electron Renderer Process (React App)                     │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │   React UI      │    │   Redux Store   │                │
│  │   Components    │    │   State Mgmt    │                │
│  └─────────────────┘    └─────────────────┘                │
├─────────────────────────────────────────────────────────────┤
│  Local Data Layer                                          │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │   SQLite        │    │   File System   │                │
│  │   Database      │    │   Storage       │                │
│  └─────────────────┘    └─────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

### Process Communication

```
Main Process                    Renderer Process
     │                              │
     │                              │
     ├── Window Creation ──────────►│
     │                              │
     ├── Menu Events ──────────────►│
     │                              │
     │◄────────── IPC Messages ─────┤
     │                              │
     ├── File Operations ──────────►│
     │                              │
     │◄────────── Data Requests ────┤
```

## Technology Stack

### Frontend (Renderer Process)
- **React 18**: Component-based UI framework
- **TypeScript**: Type-safe JavaScript development
- **Redux Toolkit**: Predictable state management
- **React Router**: Client-side routing with HashRouter
- **Tailwind CSS**: Utility-first CSS framework

### Backend (Main Process)
- **Electron**: Cross-platform desktop app framework
- **Node.js**: JavaScript runtime for main process
- **SQLite**: Local database for data persistence
- **IPC (Inter-Process Communication)**: Secure communication between processes

### Build System
- **Webpack**: Module bundler and build tool
- **TypeScript Compiler**: Type checking and transpilation
- **PostCSS**: CSS processing with Tailwind
- **Electron Builder**: Application packaging and distribution

## Component Architecture

### React Component Hierarchy

```
App
├── Navigation (Sidebar)
├── Router
│   ├── Dashboard
│   │   ├── QuickStats
│   │   ├── GoalProgress
│   │   ├── RecentHabits
│   │   └── MotivationalQuote
│   ├── Habits
│   │   ├── HabitList
│   │   ├── HabitCard
│   │   └── HabitForm
│   ├── Goals
│   │   ├── GoalList
│   │   ├── GoalCard
│   │   ├── GoalForm
│   │   └── MilestoneForm
│   ├── Journal
│   │   ├── JournalList
│   │   ├── JournalEntry
│   │   └── JournalForm
│   └── Settings
│       ├── ThemeSettings
│       ├── NotificationSettings
│       └── DataSettings
```

### Component Design Patterns

#### 1. Container/Presentational Pattern
```typescript
// Container Component (Smart)
const HabitsContainer = () => {
  const habits = useAppSelector(selectAllHabits);
  const dispatch = useAppDispatch();
  
  return (
    <HabitsPresentation 
      habits={habits}
      onAddHabit={(habit) => dispatch(addHabit(habit))}
      onUpdateHabit={(id, updates) => dispatch(updateHabit({id, updates}))}
    />
  );
};

// Presentational Component (Dumb)
const HabitsPresentation = ({ habits, onAddHabit, onUpdateHabit }) => {
  return (
    <div>
      {habits.map(habit => (
        <HabitCard key={habit.id} habit={habit} onUpdate={onUpdateHabit} />
      ))}
    </div>
  );
};
```

#### 2. Custom Hooks Pattern
```typescript
// Custom hook for habit management
const useHabits = () => {
  const habits = useAppSelector(selectAllHabits);
  const dispatch = useAppDispatch();
  
  const addHabit = useCallback((habit: Habit) => {
    dispatch(addHabit(habit));
  }, [dispatch]);
  
  const updateHabit = useCallback((id: string, updates: Partial<Habit>) => {
    dispatch(updateHabit({id, updates}));
  }, [dispatch]);
  
  return { habits, addHabit, updateHabit };
};
```

## State Management

### Redux Store Structure

```typescript
interface RootState {
  habits: HabitsState;
  goals: GoalsState;
  journal: JournalState;
  settings: SettingsState;
  achievements: AchievementsState;
}

interface HabitsState {
  items: Habit[];
  loading: boolean;
  error: string | null;
}

interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'custom';
  streak: number;
  lastCompleted: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### Redux Toolkit Slices

#### Habits Slice
```typescript
const habitsSlice = createSlice({
  name: 'habits',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    addHabit: (state, action) => {
      state.items.push({
        ...action.payload,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    },
    updateHabit: (state, action) => {
      const { id, updates } = action.payload;
      const habit = state.items.find(h => h.id === id);
      if (habit) {
        Object.assign(habit, updates, { updatedAt: new Date() });
      }
    },
    deleteHabit: (state, action) => {
      state.items = state.items.filter(h => h.id !== action.payload);
    }
  }
});
```

## Data Persistence

### SQLite Database Schema

```sql
-- Habits table
CREATE TABLE habits (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  frequency TEXT NOT NULL,
  streak INTEGER DEFAULT 0,
  last_completed DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Goals table
CREATE TABLE goals (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  target_date DATETIME,
  completed BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Journal entries table
CREATE TABLE journal_entries (
  id TEXT PRIMARY KEY,
  title TEXT,
  content TEXT NOT NULL,
  mood TEXT,
  tags TEXT, -- JSON array
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Data Access Layer

```typescript
class DatabaseService {
  private db: Database;
  
  constructor() {
    this.db = new Database('better-me.db');
    this.initializeTables();
  }
  
  async getHabits(): Promise<Habit[]> {
    const rows = await this.db.all('SELECT * FROM habits ORDER BY created_at DESC');
    return rows.map(this.mapRowToHabit);
  }
  
  async addHabit(habit: Omit<Habit, 'id' | 'createdAt' | 'updatedAt'>): Promise<Habit> {
    const id = generateId();
    const now = new Date();
    
    await this.db.run(
      'INSERT INTO habits (id, name, description, frequency, streak, last_completed, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, habit.name, habit.description, habit.frequency, habit.streak, habit.lastCompleted, now, now]
    );
    
    return { ...habit, id, createdAt: now, updatedAt: now };
  }
  
  private mapRowToHabit(row: any): Habit {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      frequency: row.frequency,
      streak: row.streak,
      lastCompleted: row.last_completed ? new Date(row.last_completed) : null,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }
}
```

## Security Architecture

### Process Isolation

```
┌─────────────────────────────────────────────────────────────┐
│                    Electron Security Model                  │
├─────────────────────────────────────────────────────────────┤
│  Main Process (Node.js)                                     │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │   File System   │    │   Database      │                │
│  │   Access        │    │   Operations    │                │
│  └─────────────────┘    └─────────────────┘                │
│           │                       │                        │
│           └─────────── IPC ───────┘                        │
│                        │                                   │
├─────────────────────────────────────────────────────────────┤
│  Renderer Process (Chromium)                               │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │   React UI      │    │   User Input    │                │
│  │   Components    │    │   Handling      │                │
│  └─────────────────┘    └─────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

### Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self' 'unsafe-inline' 'unsafe-eval';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  connect-src 'self';
">
```

### Data Encryption

```typescript
class EncryptionService {
  private key: Buffer;
  
  constructor() {
    this.key = this.generateKey();
  }
  
  encrypt(data: string): string {
    const cipher = crypto.createCipher('aes-256-cbc', this.key);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
  
  decrypt(encryptedData: string): string {
    const decipher = crypto.createDecipher('aes-256-cbc', this.key);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
  
  private generateKey(): Buffer {
    // Generate or retrieve encryption key
    // Store securely on device
  }
}
```

## Build and Deployment

### Build Process

```
Source Code
    │
    ├── TypeScript Compilation
    │   ├── Type checking
    │   └── Transpilation to JavaScript
    │
    ├── Webpack Bundling
    │   ├── Module resolution
    │   ├── Code splitting
    │   ├── Asset optimization
    │   └── Bundle generation
    │
    ├── Electron Packaging
    │   ├── Main process bundling
    │   ├── Renderer process bundling
    │   ├── Native dependencies
    │   └── Application packaging
    │
    └── Distribution
        ├── Windows installer
        ├── Portable executable
        └── Code signing
```

### Webpack Configuration

```javascript
module.exports = {
  entry: './src/main.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
  ],
  externals: {
    electron: 'commonjs electron',
  },
};
```

## Performance Considerations

### Memory Management

```typescript
// Efficient component rendering
const HabitList = memo(({ habits }: { habits: Habit[] }) => {
  return (
    <div>
      {habits.map(habit => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  );
});

// Lazy loading for large datasets
const JournalEntries = lazy(() => import('./JournalEntries'));

// Debounced search
const useDebouncedSearch = (searchTerm: string, delay: number) => {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [searchTerm, delay]);
  
  return debouncedTerm;
};
```

### Database Optimization

```sql
-- Indexes for performance
CREATE INDEX idx_habits_created_at ON habits(created_at);
CREATE INDEX idx_habits_frequency ON habits(frequency);
CREATE INDEX idx_goals_target_date ON goals(target_date);
CREATE INDEX idx_journal_created_at ON journal_entries(created_at);

-- Efficient queries
SELECT * FROM habits 
WHERE frequency = 'daily' 
AND last_completed < date('now', '-1 day')
ORDER BY streak DESC;
```

## Accessibility Architecture

### WCAG 2.1 AA Compliance

```typescript
// Accessible component patterns
const AccessibleButton = ({ children, onClick, ...props }) => (
  <button
    onClick={onClick}
    className="btn-primary"
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick();
      }
    }}
    {...props}
  >
    {children}
  </button>
);

// Screen reader support
const HabitCard = ({ habit }) => (
  <div
    role="article"
    aria-labelledby={`habit-${habit.id}-title`}
    aria-describedby={`habit-${habit.id}-description`}
  >
    <h3 id={`habit-${habit.id}-title`}>{habit.name}</h3>
    <p id={`habit-${habit.id}-description`}>{habit.description}</p>
    <div aria-live="polite" aria-atomic="true">
      Streak: {habit.streak} days
    </div>
  </div>
);
```

### Keyboard Navigation

```typescript
// Focus management
const useFocusManagement = () => {
  const focusRef = useRef<HTMLDivElement>(null);
  
  const focusFirstElement = useCallback(() => {
    const firstFocusable = focusRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;
    firstFocusable?.focus();
  }, []);
  
  return { focusRef, focusFirstElement };
};
```

## Testing Architecture

### Testing Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    Testing Pyramid                          │
├─────────────────────────────────────────────────────────────┤
│  E2E Tests (Playwright)                                     │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │   User Flows    │    │   Integration   │                │
│  │   Testing       │    │   Testing       │                │
│  └─────────────────┘    └─────────────────┘                │
├─────────────────────────────────────────────────────────────┤
│  Integration Tests (Jest)                                   │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │   Component     │    │   Redux Store   │                │
│  │   Integration   │    │   Testing       │                │
│  └─────────────────┘    └─────────────────┘                │
├─────────────────────────────────────────────────────────────┤
│  Unit Tests (Jest)                                          │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │   Functions     │    │   Components    │                │
│  │   Testing       │    │   Testing       │                │
│  └─────────────────┘    └─────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

### Test Examples

```typescript
// Unit test example
describe('HabitCard', () => {
  it('renders habit information correctly', () => {
    const habit = {
      id: '1',
      name: 'Daily Exercise',
      description: '30 minutes of physical activity',
      streak: 5,
      frequency: 'daily'
    };
    
    render(<HabitCard habit={habit} />);
    
    expect(screen.getByText('Daily Exercise')).toBeInTheDocument();
    expect(screen.getByText('30 minutes of physical activity')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});

// Integration test example
describe('Habit Management', () => {
  it('allows adding a new habit', async () => {
    render(<Habits />);
    
    const addButton = screen.getByText('Add Habit');
    fireEvent.click(addButton);
    
    const nameInput = screen.getByLabelText('Habit Name');
    fireEvent.change(nameInput, { target: { value: 'New Habit' } });
    
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(screen.getByText('New Habit')).toBeInTheDocument();
    });
  });
});
```

## Future Architecture Considerations

### Scalability

- **Microservices**: Potential migration to microservices for cloud features
- **Plugin System**: Extensible architecture for third-party integrations
- **API Gateway**: Centralized API management for external services
- **Caching Layer**: Redis or similar for performance optimization

### Cross-Platform

- **Shared Core**: Common business logic across platforms
- **Platform-Specific UI**: Native UI components for each platform
- **Unified State**: Shared state management across platforms
- **Platform Services**: Platform-specific service abstractions

### Cloud Integration

- **Optional Sync**: User-controlled cloud synchronization
- **End-to-End Encryption**: Client-side encryption for cloud data
- **Conflict Resolution**: Intelligent merge strategies for data conflicts
- **Offline-First**: Seamless offline/online experience

---

**Better-Me Architecture** - *Building a foundation for gentle growth* 🏗️

*This architecture document is living and will be updated as the application evolves.*
