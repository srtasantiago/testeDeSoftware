package dao;

import model.Usuario;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TesteUsuarioDAO {

    // Método para criar a tabela 'usuarios' caso não exista
    public void criarTabela() throws SQLException, ClassNotFoundException {
        String sql = "CREATE TABLE IF NOT EXISTS usuarios (" +
                     "id SERIAL PRIMARY KEY," +
                     "nome VARCHAR(100) NOT NULL," +
                     "email VARCHAR(100) NOT NULL UNIQUE," +
                     "senha VARCHAR(100) NOT NULL" +
                     ")";
        try (Connection conn = Conexao.conectar();
             Statement stmt = conn.createStatement()) {
            stmt.execute(sql);
        }
    }

    // Inserir usuário no banco
    public void inserir(Usuario usuario) throws SQLException, ClassNotFoundException {
        String sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
        try (Connection conn = Conexao.conectar();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, usuario.getNome());
            ps.setString(2, usuario.getEmail());
            ps.setString(3, usuario.getSenha()); // Atenção: idealmente criptografar a senha
            ps.executeUpdate();
        }
    }

    // Listar todos os usuários
    public List<Usuario> listar() throws SQLException, ClassNotFoundException {
        List<Usuario> usuarios = new ArrayList<>();
        String sql = "SELECT id, nome, email, senha FROM usuarios";

        try (Connection conn = Conexao.conectar();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Usuario u = new Usuario();
                u.setId(rs.getInt("id"));
                u.setNome(rs.getString("nome"));
                u.setEmail(rs.getString("email"));
                u.setSenha(rs.getString("senha"));
                usuarios.add(u);
            }
        }
        return usuarios;
    }

    // Autenticar usuário pelo email e senha
    public boolean autenticar(String email, String senha) throws SQLException, ClassNotFoundException {
        String sql = "SELECT senha FROM usuarios WHERE email = ?";
        try (Connection conn = Conexao.conectar();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, email);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    String senhaBanco = rs.getString("senha");
                    return senhaBanco.equals(senha);
                } else {
                    return false; // Usuário não encontrado
                }
            }
        }
    }
}
