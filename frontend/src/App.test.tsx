import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders contact form', () => {
  render(<App />);
  const formTitle = screen.getByText(/Formulario de Contacto/i);
  expect(formTitle).toBeInTheDocument();
});

test('renders form fields', () => {
  render(<App />);
  
  // Verificar que los campos del formulario estén presentes
  const nameInput = screen.getByLabelText(/nombre/i);
  const emailInput = screen.getByLabelText(/email/i);
  const messageInput = screen.getByLabelText(/mensaje/i);
  const submitButton = screen.getByText(/enviar contacto/i);
  
  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(messageInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('renders contacts section', () => {
  render(<App />);
  const contactsSection = screen.getByText(/Contactos Enviados/i);
  expect(contactsSection).toBeInTheDocument();
});