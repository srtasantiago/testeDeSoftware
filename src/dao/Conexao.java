package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexao {
    public static Connection conectar() throws SQLException {
        String url = "jdbc:postgresql://localhost:5432/conectapatas";
        String user = "postgres";
        String password = "admin";
        return DriverManager.getConnection(url, user, password);
    }
}
