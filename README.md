**README.md**

# Barbearia Style ✂️

Sistema web progressivo (PWA) de agendamento de horários para barbearias, desenvolvido para facilitar a gestão de clientes, profissionais, serviços e pagamentos de forma simples, direta e integrada ao WhatsApp.

---

## 🚀 Funcionalidades

* **Agendamento Prático:** O cliente escolhe o profissional, o serviço desejado, a data e o horário disponível em uma interface intuitiva.
* **Envio Automático via WhatsApp:** Após a confirmação, o sistema gera uma mensagem pronta com todos os detalhes e direciona o usuário para o WhatsApp da barbearia.
* **Painel do Barbeiro (Área Restrita):**
* Protegido por senha mestre.
* Visualização de agendamentos por data e profissional.
* Faturamento estimado em tempo real.
* Cadastro, atualização de preços e exclusão de serviços dinâmicos (com persistência local).
* Personalização dos nomes dos profissionais.
* Liberação manual de horários ocupados.


* **Promoção do Dia:** Seção editável para divulgar ofertas e descontos especiais na página inicial.
* **Pagamento via PIX:** Aba dedicada com chave PIX e QR Code para facilitar transações financeiras.
* **Sistema de Avaliações:** Espaço para os clientes deixarem notas com estrelas e comentários públicos salvos no navegador.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5 / CSS3:** Estrutura e estilização responsiva com tema escuro otimizado para dispositivos móveis.
* **JavaScript (Vanilla):** Lógica da aplicação, manipulação do DOM e regras de agendamento/horários.
* **LocalStorage:** Armazenamento local no navegador para manter dados de serviços, agendamentos, avaliações e configurações dos barbeiros sem a necessidade de um banco de dados externo.
* **PWA (Progressive Web App):** Suporte a Web App Manifest e Service Worker para instalação e funcionamento otimizado.

---

## 📂 Estrutura de Arquivos

* `index.html`: Arquivo principal contendo toda a estrutura de telas (capa, app principal, painel, PIX e avaliações).
* `styles.css`: Folha de estilos global com variáveis de cores e layout responsivo.
* `script.js`: Arquivo de lógica contendo o gerenciamento de rotas, horários, cadastros no `localStorage` e integração com o WhatsApp.
* `manifest.json` & `sw.js`: Configurações de PWA.

---

## ⚙️ Como Executar o Projeto

1. Baixe ou clone os arquivos do projeto (`index.html`, `styles.css`, `script.js`) na mesma pasta.
2. Abra o arquivo **`index.html`** diretamente em qualquer navegador web moderno.
3. Para testar o painel administrativo, role até a seção **Painel do Barbeiro** e utilize a senha padrão: `1234`.
