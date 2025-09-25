# Contributing to Better-Me 💚

Thank you for your interest in contributing to Better-Me! We're building a gentle, inclusive self-improvement app, and your help makes it possible.

## 🌟 Our Mission

Better-Me is more than just an app—it's a movement toward kinder, more compassionate self-improvement. We believe in:
- **Gentle growth** over harsh perfectionism
- **Inclusive design** that works for all neurotypes
- **Privacy-first** development
- **Community-driven** improvement

## 🤝 How to Contribute

### 🐛 Bug Reports
Found a bug? Help us fix it!
1. Check if it's already reported in [Issues](https://github.com/AfyKirby1/Better-Me/issues)
2. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your system info (Windows version, etc.)

### ✨ Feature Requests
Have an idea? We'd love to hear it!
1. Check existing [Issues](https://github.com/AfyKirby1/Better-Me/issues) first
2. Create a new issue with:
   - Clear description of the feature
   - Why it would be valuable
   - How it aligns with our mission
   - Any mockups or examples

### 💻 Code Contributions

#### Getting Started
1. **Fork** the repository
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/yourusername/Better-Me.git
   cd Better-Me
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Create** a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### Development Workflow
1. **Make changes** following our coding standards
2. **Test** your changes thoroughly
3. **Update** documentation if needed
4. **Commit** with clear messages:
   ```bash
   git commit -m "feat: add gentle habit reminders"
   ```
5. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create** a Pull Request

#### Coding Standards

**TypeScript/React:**
- Use TypeScript for all new code
- Follow React best practices
- Use functional components with hooks
- Write meaningful component names

**Styling:**
- Use Tailwind CSS classes
- Follow our design system
- Ensure accessibility (WCAG 2.1 AA)
- Test with different themes

**State Management:**
- Use Redux Toolkit for global state
- Keep components focused and simple
- Use proper TypeScript types

**Testing:**
- Write tests for new features
- Test accessibility features
- Test with different user scenarios

#### Code Style
```typescript
// Good: Clear, descriptive names
const GentleHabitReminder = ({ habit, onComplete }: Props) => {
  const handleComplete = useCallback(() => {
    onComplete(habit.id);
  }, [habit.id, onComplete]);

  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900">
        {habit.name}
      </h3>
      <button
        onClick={handleComplete}
        className="btn-primary mt-2"
        aria-label={`Complete ${habit.name}`}
      >
        Mark Complete
      </button>
    </div>
  );
};
```

### 📝 Documentation
Help others understand and use Better-Me:
- Update README.md for new features
- Add code comments for complex logic
- Improve user guides
- Translate documentation

### 🎨 Design
Help make Better-Me beautiful and accessible:
- UI/UX improvements
- Accessibility enhancements
- Theme designs
- Icon creation

### 🧪 Testing
Help ensure quality:
- Test new features
- Report edge cases
- Test accessibility
- Cross-platform testing

## 📋 Pull Request Guidelines

### Before Submitting
- [ ] Code follows our style guide
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] Accessibility tested
- [ ] No console errors
- [ ] Responsive design tested

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on Windows 11
- [ ] Tested accessibility
- [ ] No console errors
- [ ] Responsive design works

## Screenshots
(if applicable)

## Related Issues
Closes #(issue number)
```

## 🚫 What We Don't Accept

To maintain our mission and quality:
- Features that compromise user privacy
- Changes that make the app less accessible
- Code that doesn't align with our gentle philosophy
- Contributions without proper attribution

## 💬 Communication

### Be Kind and Respectful
- Use inclusive language
- Assume good intentions
- Be patient with questions
- Celebrate small wins

### Getting Help
- Join [GitHub Discussions](https://github.com/AfyKirby1/Better-Me/discussions)
- Ask questions in Issues
- Check existing documentation

## 🏆 Recognition

Contributors are recognized in:
- README.md acknowledgments
- Release notes
- GitHub contributor list
- Our community highlights

## 📜 License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers the project.

## 🤔 Questions?

Don't hesitate to ask! Create an issue or start a discussion. We're here to help and make contributing as smooth as possible.

---

**Thank you for helping make Better-Me a more gentle, inclusive, and supportive place for everyone's growth journey!** 🌱💚
