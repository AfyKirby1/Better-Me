import React from 'react'

const MotivationalQuote = () => {
  const quotes = [
    {
      text: "The best project you'll ever work on is yourself.",
      author: "Better-Me Team"
    },
    {
      text: "Progress, not perfection.",
      author: "Unknown"
    },
    {
      text: "Every small step counts in the journey of growth.",
      author: "Better-Me Team"
    },
    {
      text: "You are worthy of becoming exactly who you're meant to be.",
      author: "Better-Me Team"
    },
    {
      text: "Gentle growth is still growth.",
      author: "Better-Me Team"
    }
  ]

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  return (
    <div className="card-gentle">
      <div className="text-center">
        <div className="text-4xl mb-4">💚</div>
        <blockquote className="text-lg font-medium text-slate-900 mb-2">
          "{randomQuote.text}"
        </blockquote>
        <cite className="text-sm text-slate-500">— {randomQuote.author}</cite>
      </div>
    </div>
  )
}

export default MotivationalQuote

