package controller;

import dao.UsuarioDAO;
import model.Usuario;

import java.sql.SQLException;

public class UsuarioController {

    private UsuarioDAO dao = new UsuarioDAO();

    public String cadastrarUsuario(Usuario u) throws SQLException, ClassNotFoundException {
        if (u.getEmail() == null || u.getEmail().isEmpty() || u.getSenha() == null || u.getSenha().isEmpty()) {
            return "E-mail e senha são obrigatórios.";
        }

        if (dao.emailExiste(u.getEmail())) {
            return "E-mail já cadastrado.";
        }

        dao.cadastrar(u); // salva no banco PostgreSQL
        return null;
    }

    public Usuario login(String email, String senha) throws SQLException, ClassNotFoundException {
        if (email == null || senha == null) {
            return null;
        }
        Usuario u = dao.buscarPorEmail(email);
        if (u != null && u.getSenha().equals(senha)) {
            return u;
        }
        return null;
    }
}
