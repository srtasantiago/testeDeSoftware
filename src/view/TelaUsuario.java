package view;

import controller.UsuarioController;
import model.Usuario;

import javax.swing.*;
import java.awt.*;

public class TelaUsuario extends JFrame {

    private JTextField campoEmail;
    private JPasswordField campoSenha;
    private JButton botaoEntrar;
    private JButton botaoCadastrar;

    private UsuarioController usuarioController = new UsuarioController();

    public TelaUsuario() {
        super("Login");

        setLayout(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();

        Font fonteLabel = new Font("Segoe UI", Font.PLAIN, 14);
        Font fonteCampo = new Font("Segoe UI", Font.PLAIN, 14);
        Font fonteBotao = new Font("Segoe UI", Font.BOLD, 14);

        Color azulFundo = new Color(0x003399);
        Color amareloBotao = new Color(0xf8a728);

        getContentPane().setBackground(azulFundo);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setSize(400, 360);
        setLocationRelativeTo(null);

        // Label E-mail
        JLabel labelEmail = new JLabel("E-mail");
        labelEmail.setFont(fonteLabel);
        labelEmail.setForeground(Color.WHITE);
        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.anchor = GridBagConstraints.LINE_START;
        gbc.insets = new Insets(20, 20, 5, 20);
        add(labelEmail, gbc);

        // Campo E-mail
        campoEmail = new JTextField(20);
        campoEmail.setFont(fonteCampo);
        campoEmail.setBackground(Color.WHITE);
        campoEmail.setForeground(Color.BLACK);
        gbc.gridx = 0;
        gbc.gridy = 1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(0, 20, 15, 20);
        add(campoEmail, gbc);

        // Label Senha
        JLabel labelSenha = new JLabel("Senha");
        labelSenha.setFont(fonteLabel);
        labelSenha.setForeground(Color.WHITE);
        gbc.gridx = 0;
        gbc.gridy = 2;
        gbc.fill = GridBagConstraints.NONE;
        gbc.insets = new Insets(0, 20, 5, 20);
        add(labelSenha, gbc);

        // Campo Senha
        campoSenha = new JPasswordField(20);
        campoSenha.setFont(fonteCampo);
        campoSenha.setBackground(Color.WHITE);
        campoSenha.setForeground(Color.BLACK);
        gbc.gridx = 0;
        gbc.gridy = 3;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(0, 20, 20, 20);
        add(campoSenha, gbc);

        // Botão Entrar
        botaoEntrar = new JButton("Login");
        botaoEntrar.setFont(fonteBotao);
        botaoEntrar.setBackground(amareloBotao);
        botaoEntrar.setForeground(Color.BLACK);
        botaoEntrar.setFocusPainted(false);
        botaoEntrar.setCursor(new Cursor(Cursor.HAND_CURSOR));
        botaoEntrar.setPreferredSize(new Dimension(300, 40));
        gbc.gridx = 0;
        gbc.gridy = 4;
        gbc.fill = GridBagConstraints.NONE;
        gbc.insets = new Insets(0, 20, 10, 20);
        gbc.anchor = GridBagConstraints.CENTER;
        add(botaoEntrar, gbc);

        // Botão Cadastrar
        botaoCadastrar = new JButton("CADASTRe-SE");
        botaoCadastrar.setFont(fonteBotao);
        botaoCadastrar.setBackground(Color.WHITE);
        botaoCadastrar.setForeground(azulFundo);
        botaoCadastrar.setFocusPainted(false);
        botaoCadastrar.setCursor(new Cursor(Cursor.HAND_CURSOR));
        botaoCadastrar.setPreferredSize(new Dimension(300, 40));
        gbc.gridx = 0;
        gbc.gridy = 5;
        gbc.insets = new Insets(0, 20, 20, 20);
        add(botaoCadastrar, gbc);

        // Ações dos botões
        botaoEntrar.addActionListener(e -> {
            String email = campoEmail.getText();
            String senha = new String(campoSenha.getPassword());

            try {
                Usuario usuario = usuarioController.login(email, senha);
                if (usuario != null) {
                    JOptionPane.showMessageDialog(this, "Login efetuado com sucesso!");
                    dispose();
                    // abrir tela principal, por exemplo
                } else {
                    JOptionPane.showMessageDialog(this, "E-mail ou senha inválidos");
                }
            } catch (IllegalArgumentException ex) {
                JOptionPane.showMessageDialog(this, ex.getMessage());
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Erro inesperado: " + ex.getMessage());
                ex.printStackTrace();
            }
        });

        botaoCadastrar.addActionListener(e -> {
            new CadastroUsuario().setVisible(true);
        });
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            TelaUsuario tela = new TelaUsuario();
            tela.setVisible(true);
        });
    }
}
