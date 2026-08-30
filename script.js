const NUMERO_WHATSAPP = "5547989037974";
const CHAVE_PIX = "47989037974";
const horariosBase = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
let horarioSelecionado = null;
let linkWhatsAppTemp = "";
const SENHA_MESTRE = "1234";

let servicosPadrao = [
    { nome: "Corte de Cabelo", preco: 35 },
    { nome: "Corte + Barba", preco: 60 },
    { nome: "Corte + Barba + Sobrancelha", preco: 75 }
];

function carregarServicos() {
    const salvos = JSON.parse(localStorage.getItem('servicos_barbearia')) || servicosPadrao;
    const container = document.getElementById('servicos-container');
    if (!container) return;

    container.innerHTML = salvos.map((s, index) => `
        <label class="servico-item" style="display: flex; justify-content: space-between; align-items: center; background: #2b2b2b; padding: 10px; border-radius: 8px; margin-bottom: 8px; cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <input type="radio" name="servico" value="${s.nome} - R$ ${s.preco}" ${index === 0 ? 'checked' : ''}>
                <span>${s.nome} - R$ ${s.preco}</span>
            </div>
        </label>
    `).join('');
}

function carregarPainelServicos() {
    const painelServicosLista = document.getElementById('painel-servicos-cadastrados');
    if (!painelServicosLista) return;

    const salvos = JSON.parse(localStorage.getItem('servicos_barbearia')) || servicosPadrao;
    painelServicosLista.innerHTML = salvos.map((s, index) => `
        <div style="display: flex; justify-content: space-between; align-items: center; background: #111; padding: 6px 10px; border-radius: 4px; font-size: 0.8rem;">
            <span>${s.nome} - R$ ${s.preco}</span>
            <button onclick="removerServico(${index})" style="background: #e74c3c; color: white; border: none; padding: 2px 6px; border-radius: 4px; cursor: pointer;">Excluir</button>
        </div>
    `).join('');
}

function adicionarServico() {
    const nomeInput = document.getElementById('novo-servico-nome').value.trim();
    const preco = document.getElementById('novo-servico-preco').value.replace('R$', '').trim();
    
    if (nomeInput && preco) {
        let salvos = JSON.parse(localStorage.getItem('servicos_barbearia')) || servicosPadrao;
        
        // Verifica se já existe um serviço com esse nome exato para atualizar em vez de duplicar
        const indexExistente = salvos.findIndex(s => s.nome.toLowerCase() === nomeInput.toLowerCase());

        if (indexExistente !== -1) {
            salvos[indexExistente].preco = Number(preco);
            alert(`O preço do serviço "${salvos[indexExistente].nome}" foi atualizado para R$ ${preco}!`);
        } else {
            salvos.push({ nome: nomeInput, preco: Number(preco) });
            alert("Novo serviço cadastrado com sucesso!");
        }

        localStorage.setItem('servicos_barbearia', JSON.stringify(salvos));
        document.getElementById('novo-servico-nome').value = '';
        document.getElementById('novo-servico-preco').value = '';
        carregarServicos();
        carregarPainelServicos();
    } else {
        alert("Preencha o nome e o preço do serviço.");
    }
}

function removerServico(index) {
    let salvos = JSON.parse(localStorage.getItem('servicos_barbearia')) || servicosPadrao;
    if (salvos.length <= 1) {
        alert("Você precisa manter pelo menos um serviço cadastrado.");
        return;
    }
    salvos.splice(index, 1);
    localStorage.setItem('servicos_barbearia', JSON.stringify(salvos));
    carregarServicos();
    carregarPainelServicos();
}

function carregarNomesBarbeiros() {
    const nome1 = localStorage.getItem('barbeiro1_nome') || "Barbeiro 1";
    const nome2 = localStorage.getItem('barbeiro2_nome') || "Barbeiro 2";

    document.getElementById('label-barbeiro1').innerText = nome1;
    document.getElementById('label-barbeiro2').innerText = nome2;
    
    document.querySelector('input[name="barbeiro"][value="Barbeiro 1"]').value = nome1;
    document.querySelector('input[name="barbeiro"][value="Barbeiro 2"]').value = nome2;
}

const inputData = document.getElementById('data-agendamento');
if (inputData) {
    inputData.min = new Date().toISOString().split('T')[0];
}

function entrarApp() {
    document.getElementById('tela-capa').classList.add('hidden');
    document.getElementById('app-principal').classList.remove('hidden');
    carregarNomesBarbeiros();
    carregarServicos();
}

function mudarAba(abaId) {
    document.querySelectorAll('.aba-conteudo').forEach(aba => aba.classList.add('hidden'));
    document.querySelectorAll('.menu-btn').forEach(btn => btn.classList.remove('ativo'));

    document.getElementById(`aba-${abaId}`).classList.remove('hidden');
    document.getElementById(`btn-aba-${abaId}`).classList.add('ativo');
}

const editNomesBtn = document.getElementById('edit-nomes-btn');
if (editNomesBtn) {
    editNomesBtn.onclick = function () {
        const formNomes = document.getElementById('nomes-edit-form');
        formNomes.classList.toggle('hidden');
        if (!formNomes.classList.contains('hidden')) {
            document.getElementById('input-barbeiro1').value = document.getElementById('label-barbeiro1').innerText;
            document.getElementById('input-barbeiro2').value = document.getElementById('label-barbeiro2').innerText;
        }
    };
}

function salvarNomesBarbeiros() {
    const n1 = document.getElementById('input-barbeiro1').value.trim();
    const n2 = document.getElementById('input-barbeiro2').value.trim();
    if (n1 && n2) {
        localStorage.setItem('barbeiro1_nome', n1);
        localStorage.setItem('barbeiro2_nome', n2);
        carregarNomesBarbeiros();
        document.getElementById('nomes-edit-form').classList.add('hidden');
        atualizarHorarios();
    } else {
        alert("Preencha os dois nomes.");
    }
}

function acessarPainel() {
    const senhaDigitada = document.getElementById('senha-barbeiro').value;
    if (senhaDigitada === SENHA_MESTRE) {
        document.getElementById('painel-login').classList.add('hidden');
        document.getElementById('painel-conteudo').classList.remove('hidden');
        carregarPainelServicos();
        atualizarHorarios(); 
    } else {
        alert("Senha incorreta!");
    }
}

function fecharPainel() {
    document.getElementById('senha-barbeiro').value = '';
    document.getElementById('painel-conteudo').classList.add('hidden');
    document.getElementById('painel-login').classList.remove('hidden');
}

function atualizarHorarios() {
    const dataInput = document.getElementById('data-agendamento').value;
    const barbeiroSelecionado = document.querySelector('input[name="barbeiro"]:checked').value;
    const grid = document.getElementById('horarios-grid');
    const painelOcupados = document.getElementById('painel-ocupados');
    const painelFaturamento = document.getElementById('painel-faturamento');
    
    if (!grid) return;
    
    grid.innerHTML = '';
    horarioSelecionado = null;

    if (!dataInput) {
        if (painelOcupados) painelOcupados.innerHTML = '<p style="font-size: 0.85rem; color: #888;">Selecione uma data acima primeiro.</p>';
        if (painelFaturamento) painelFaturamento.innerHTML = '';
        return;
    }

    const chaveStorage = `agendamentos_${barbeiroSelecionado}_${dataInput}`;
    const dadosSalvos = JSON.parse(localStorage.getItem(chaveStorage)) || [];
    const ocupados = dadosSalvos.map(item => typeof item === 'string' ? item : item.horario);

    const hojeStr = new Date().toISOString().split('T')[0];
    const horaAtual = new Date().getHours();
    const minutoAtual = new Date().getMinutes();

    horariosBase.forEach(horario => {
        let isOcupado = ocupados.includes(horario);
        
        if (dataInput === hojeStr) {
            const [hHorario, mHorario] = horario.split(':').map(Number);
            if (hHorario < horaAtual || (hHorario === horaAtual && minutoAtual > mHorario)) {
                isOcupado = true;
            }
        }

        const btn = document.createElement('button');
        btn.className = 'btn-horario';

        const dot = document.createElement('span');
        dot.className = `status-dot ${isOcupado ? 'ocupado' : 'livre'}`;

        btn.appendChild(dot);
        btn.appendChild(document.createTextNode(horario));

        if (isOcupado) {
            btn.disabled = true;
            btn.style.opacity = '0.5';
        } else {
            btn.onclick = () => {
                document.querySelectorAll('.btn-horario').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                horarioSelecionado = horario;
            };
        }
        grid.appendChild(btn);
    });

    const conteudoVisivel = document.getElementById('painel-conteudo') && !document.getElementById('painel-conteudo').classList.contains('hidden');
    
    if (conteudoVisivel) {
        let totalFaturamento = 0;
        dadosSalvos.forEach(item => {
            if (item.preco) totalFaturamento += Number(item.preco);
        });

        if (painelFaturamento) {
            painelFaturamento.innerHTML = `💰 Faturamento Estimado (${barbeiroSelecionado}): <strong style="color: #2ecc71;">R$ ${totalFaturamento},00</strong>`;
        }

        if (dadosSalvos.length === 0) {
            painelOcupados.innerHTML = `<p style="font-size: 0.85rem; color: #2ecc71;">Nenhum agendamento para ${barbeiroSelecionado} nesta data.</p>`;
        } else {
            painelOcupados.innerHTML = `<p style="font-size: 0.85rem; margin-bottom: 5px; color: #f39c12;">Agendamentos de: <strong>${barbeiroSelecionado}</strong></p>` + 
            '<div style="display: flex; flex-direction: column; gap: 8px;">' + 
                dadosSalvos.map(item => {
                    const h = item.horario || item;
                    const cli = item.cliente ? ` - ${item.cliente}` : '';
                    return `
                        <div style="display: flex; justify-content: space-between; align-items: center; background: #2b2b2b; padding: 8px 12px; border-radius: 6px; font-size: 0.85rem;">
                            <span>⏰ <strong>${h}</strong>${cli}</span>
                            <button onclick="liberarHorario('${dataInput}', '${barbeiroSelecionado}', '${h}')" style="background: #e74c3c; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.75rem;">Liberar</button>
                        </div>
                    `;
                }).join('') + '</div>';
        }
    }
}

function liberarHorario(data, barbeiro, horarioParaLiberar) {
    const chaveStorage = `agendamentos_${barbeiro}_${data}`;
    let dadosSalvos = JSON.parse(localStorage.getItem(chaveStorage)) || [];
    dadosSalvos = dadosSalvos.filter(item => (item.horario || item) !== horarioParaLiberar);
    localStorage.setItem(chaveStorage, JSON.stringify(dadosSalvos));
    alert(`O horário ${horarioParaLiberar} de ${barbeiro} foi liberado!`);
    atualizarHorarios();
}

function prepararAgendamento() {
    const nome = document.getElementById('nome-cliente').value;
    const data = document.getElementById('data-agendamento').value;
    const barbeiroSelecionado = document.querySelector('input[name="barbeiro"]:checked').value;
    const servicoElement = document.querySelector('input[name="servico"]:checked');

    if (!nome || !data || !horarioSelecionado || !servicoElement) {
        alert("Por favor, preencha seu nome, selecione o profissional, o serviço, a data e o horário.");
        return;
    }

    const servicoTexto = servicoElement.value;
    const partesPreco = servicoTexto.split('R$');
    const precoServico = partesPreco[1] ? partesPreco[1].trim() : 0;

    const chaveStorage = `agendamentos_${barbeiroSelecionado}_${data}`;
    let dadosSalvos = JSON.parse(localStorage.getItem(chaveStorage)) || [];
    
    dadosSalvos.push({
        horario: horarioSelecionado,
        cliente: nome,
        servico: servicoTexto,
        preco: precoServico
    });
    
    localStorage.setItem(chaveStorage, JSON.stringify(dadosSalvos));

    const mensagem = `Olá! Gostaria de agendar um horário:%0A%0A` +
        `✂️ *Profissional:* ${barbeiroSelecionado}%0A` +
        `👤 *Cliente:* ${nome}%0A` +
        `💼 *Serviço:* ${servicoTexto}%0A` +
        `📅 *Data:* ${data}%0A` +
        `⏰ *Horário:* ${horarioSelecionado}`;

    linkWhatsAppTemp = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensagem}`;
    document.getElementById('modal-sucesso').classList.remove('hidden');
}

function finalizarNoWhatsApp() {
    document.getElementById('modal-sucesso').classList.add('hidden');
    document.getElementById('nome-cliente').value = '';
    window.open(linkWhatsAppTemp, '_blank');
    atualizarHorarios();
}

const editBtn = document.getElementById('edit-promo-btn');
if (editBtn) {
    editBtn.onclick = function () {
        document.getElementById('promo-edit-form').classList.toggle('hidden');
    };
}

function salvarPromocao() {
    const texto = document.getElementById('promo-input').value;
    if (texto) {
        document.getElementById('promo-text').innerText = texto;
        localStorage.setItem('promo_texto', texto);
        document.getElementById('promo-edit-form').classList.add('hidden');
    }
}

if (localStorage.getItem('promo_texto')) {
    document.getElementById('promo-text').innerText = localStorage.getItem('promo_texto');
}

function copiarPix() {
    navigator.clipboard.writeText(CHAVE_PIX);
    alert("Chave PIX copiada com sucesso!");
}

function selecionarEstrela(nota) {
    document.getElementById('feedback-nota').value = nota;
    const estrelas = document.querySelectorAll('#estrelas-container span');
    estrelas.forEach((estrela, index) => {
        if (index < nota) {
            estrela.style.color = '#f39c12';
        } else {
            estrela.style.color = '#444';
        }
    });
}

function enviarFeedback(e) {
    e.preventDefault();
    const nome = document.getElementById('feedback-nome').value;
    const nota = document.getElementById('feedback-nota').value;
    const texto = document.getElementById('feedback-texto').value;

    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.push({ nome, nota, texto });
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    alert("Avaliação enviada com sucesso!");
    document.getElementById('form-feedback').reset();
    selecionarEstrela(5); 
    carregarFeedbacks();
}

function carregarFeedbacks() {
    const lista = document.getElementById('lista-feedback');
    if (!lista) return;
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    lista.innerHTML = feedbacks.map(f => `
        <div class="feedback-item" style="background: #222; padding: 10px; border-radius: 6px; border-left: 3px solid #f39c12;">
            <div style="display: flex; justify-content: space-between;">
                <strong>${f.nome}</strong>
                <span style="color: #f39c12;">${'★'.repeat(f.nota || 5)}</span>
            </div>
            <p style="margin-top: 5px; color: #ddd; font-size: 0.9rem;">${f.texto}</p>
        </div>
    `).join('');
}

carregarFeedbacks();