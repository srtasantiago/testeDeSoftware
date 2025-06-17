package view;

import controller.UsuarioController;
import model.Usuario;

import javax.swing.*;
import java.awt.*;
import java.sql.SQLException;

public class CadastroUsuario extends JFrame {

    private JTextField txtNome, txtEmail, txtCidade;
    private JPasswordField txtSenha;
    private JComboBox<String> comboGenero;
    private JLabel lblMensagem;
    private UsuarioController controller = new UsuarioController();

    public CadastroUsuario() {
        super("Cadastro de Usuário");

        Color azulFundo = new Color(0x003399);
        Color amareloBotao = new Color(0xf8a728);

        Font fonteLabel = new Font("Segoe UI", Font.BOLD, 14);
        Font fonteCampo = new Font("Segoe UI", Font.PLAIN, 14);

        JPanel painel = new JPanel();
        painel.setBackground(azulFundo);
        painel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        painel.setLayout(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(8, 8, 8, 8);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        // Nome
        gbc.gridx = 0;
        gbc.gridy = 0;
        JLabel lblNome = new JLabel("Nome:");
        lblNome.setForeground(Color.WHITE);
        lblNome.setFont(fonteLabel);
        painel.add(lblNome, gbc);

        gbc.gridx = 1;
        txtNome = new JTextField(20);
        txtNome.setFont(fonteCampo);
        painel.add(txtNome, gbc);

        // Email
        gbc.gridx = 0;
        gbc.gridy++;
        JLabel lblEmail = new JLabel("E-mail:");
        lblEmail.setForeground(Color.WHITE);
        lblEmail.setFont(fonteLabel);
        painel.add(lblEmail, gbc);

        gbc.gridx = 1;
        txtEmail = new JTextField(20);
        txtEmail.setFont(fonteCampo);
        painel.add(txtEmail, gbc);

        // Senha
        gbc.gridx = 0;
        gbc.gridy++;
        JLabel lblSenha = new JLabel("Senha:");
        lblSenha.setForeground(Color.WHITE);
        lblSenha.setFont(fonteLabel);
        painel.add(lblSenha, gbc);

        gbc.gridx = 1;
        txtSenha = new JPasswordField(20);
        txtSenha.setFont(fonteCampo);
        painel.add(txtSenha, gbc);

        // Gênero
        gbc.gridx = 0;
        gbc.gridy++;
        JLabel lblGenero = new JLabel("Gênero:");
        lblGenero.setForeground(Color.WHITE);
        lblGenero.setFont(fonteLabel);
        painel.add(lblGenero, gbc);

        gbc.gridx = 1;
        comboGenero = new JComboBox<>(new String[]{"Masculino", "Feminino", "Outro"});
        comboGenero.setFont(fonteCampo);
        painel.add(comboGenero, gbc);

        // Cidade
        gbc.gridx = 0;
        gbc.gridy++;
        JLabel lblCidade = new JLabel("Cidade:");
        lblCidade.setForeground(Color.WHITE);
        lblCidade.setFont(fonteLabel);
        painel.add(lblCidade, gbc);

        gbc.gridx = 1;
        txtCidade = new JTextField(20);
        txtCidade.setFont(fonteCampo);
        painel.add(txtCidade, gbc);

        // Mensagem
        gbc.gridx = 0;
        gbc.gridy++;
        gbc.gridwidth = 2;
        lblMensagem = new JLabel("");
        lblMensagem.setForeground(Color.YELLOW);
        lblMensagem.setFont(fonteLabel);
        painel.add(lblMensagem, gbc);

        // Botão cadastrar
        gbc.gridy++;
        JButton btnCadastrar = new JButton("Cadastrar");
        btnCadastrar.setBackground(amareloBotao);
        btnCadastrar.setForeground(Color.BLACK);
        btnCadastrar.setFont(fonteLabel);
        painel.add(btnCadastrar, gbc);

        btnCadastrar.addActionListener(e -> {
            Usuario u = new Usuario();
            u.setNome(txtNome.getText().trim());
            u.setEmail(txtEmail.getText().trim());
            u.setSenha(new String(txtSenha.getPassword()));
            u.setGenero((String) comboGenero.getSelectedItem());
            u.setCidade(txtCidade.getText().trim());

            try {
                String erro = controller.cadastrarUsuario(u);
                if (erro != null) {
                    lblMensagem.setText(erro);
                } else {
                    JOptionPane.showMessageDialog(this, "Cadastro realizado com sucesso!");
                    // Aqui você pode abrir outra tela, ex: new TelaUsuario().setVisible(true);
                    dispose();
                }
            } catch (Exception ex) {
                ex.printStackTrace();
                lblMensagem.setText("Erro inesperado.");
            }
        });

        add(painel);
        setSize(450, 420);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setVisible(true);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(CadastroUsuario::new);
    }
}
