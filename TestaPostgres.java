import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class TestaPostgres {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5432/conectapatas";
        String user = "postgres";
        String password = "admin";
        try {
            Class.forName("org.postgresql.Driver");

            try (Connection conn = DriverManager.getConnection(url, user, password)) {
                System.out.println("Conectado ao banco!");

                String sqlInsert = "INSERT INTO usuarios (nome, email) VALUES (?, ?)";
                try (PreparedStatement pst = conn.prepareStatement(sqlInsert)) {
                    pst.setString(1, "javauser");
                    pst.setString(2, "javauser@email.com");
                    int rows = pst.executeUpdate();
                    System.out.println(rows + " linha(s) inserida(s).");
                }

                String sqlSelect = "SELECT id, nome, email FROM usuarios";
                try (PreparedStatement pst = conn.prepareStatement(sqlSelect);
                     ResultSet rs = pst.executeQuery()) {

                    while (rs.next()) {
                        System.out.println(rs.getInt("id") + " | " +
                                           rs.getString("nome") + " | " +
                                           rs.getString("email"));
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
