import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CadastroUsuario from '../Cadastrousuario';

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('Tela de CadastroUsuario', () => {
  beforeEach(() => {
    localStorage.clear(); // limpar dados antes de cada teste
  });

  test('renderiza corretamente os campos e o botão', () => {
    renderWithRouter(<CadastroUsuario />);

    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cadastrar/i })).toBeInTheDocument();
  });

  test('realiza cadastro com sucesso', () => {
    renderWithRouter(<CadastroUsuario />);

    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'Maria' } });
    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: 'maria@email.com' } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: '123456' } });

    fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));

    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    expect(usuarios).toHaveLength(1);
    expect(usuarios[0].email).toBe('maria@email.com');
  });

  test('não permite cadastro com e-mail repetido', () => {
    localStorage.setItem('usuarios', JSON.stringify([{ nome: 'Maria', email: 'maria@email.com', senha: '123' }]));
    renderWithRouter(<CadastroUsuario />);

    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'Outra Maria' } });
    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: 'maria@email.com' } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: '456789' } });

    fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));

    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    expect(usuarios).toHaveLength(1); // ainda deve ser só 1
  });
});
