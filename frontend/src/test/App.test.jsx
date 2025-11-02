import React from 'react';
import { render, screen } from '@testing-library/react'
import App from '../App'
import { describe, it, expect } from 'vitest'

describe('Recipe Sharing App', () => {
  it('renders the app title', () => {
    render(<App />)
    expect(screen.getByText('🍳 Recipe Sharing App')).toBeInTheDocument()
  })

  it('shows "Add New Recipe" form heading', () => {
    render(<App />)
    expect(screen.getByText('Add New Recipe')).toBeInTheDocument()
  })
})
