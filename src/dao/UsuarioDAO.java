package dao;

import model.Usuario;

import java.sql.*;

public class UsuarioDAO {

    private final String url = "jdbc:postgresql://localhost:5432/conectapatas"; // seu banco real
    private final String user = "postgres"; // seu usuário real
    private final String password = "admin"; // sua senha real

    private Connection getConnection() throws SQLException, ClassNotFoundException {
        Class.forName("org.postgresql.Driver"); // garante driver carregado
        return DriverManager.getConnection(url, user, password);
    }

    public boolean emailExiste(String email) throws SQLException, ClassNotFoundException {
        String sql = "SELECT 1 FROM usuarios WHERE email = ?";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, email);
            ResultSet rs = ps.executeQuery();
            return rs.next();
        }
    }

    public void cadastrar(Usuario u) throws SQLException, ClassNotFoundException {
        String sql = "INSERT INTO usuarios (nome, email, senha, genero, cidade) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, u.getNome());
            ps.setString(2, u.getEmail());
            ps.setString(3, u.getSenha());
            ps.setString(4, u.getGenero());
            ps.setString(5, u.getCidade());
            ps.executeUpdate();
        }
    }

    public Usuario buscarPorEmail(String email) throws SQLException, ClassNotFoundException {
        String sql = "SELECT * FROM usuarios WHERE email = ?";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, email);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Usuario u = new Usuario();
                u.setNome(rs.getString("nome"));
                u.setEmail(rs.getString("email"));
                u.setSenha(rs.getString("senha"));
                u.setGenero(rs.getString("genero"));
                u.setCidade(rs.getString("cidade"));
                return u;
            }
            return null;
        }
    }
}
