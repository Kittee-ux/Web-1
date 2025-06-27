// Dados dos setores
const setores = [
  { nome: 'Bloco de Engenharia', local: 'Bloco A', capacidade: 15, estacionadas: 6, coberto: true, vigilancia: true, iluminacao: false, expandido: false },
  { nome: 'Biblioteca', local: 'Biblioteca Central', capacidade: 15, estacionadas: 12, coberto: false, vigilancia: false, iluminacao: true, expandido: false },
  { nome: 'Bloco de T.I', local: 'Bloco B', capacidade: 15, estacionadas: 10, coberto: true, vigilancia: true, iluminacao: true, expandido: false }
];

function getStatus(s) {
  const p = s.estacionadas / s.capacidade;
  if (p < 0.7) return { c: 'disponivel', t: 'Disponível' };
  if (p < 1) return { c: 'quase-cheio', t: 'Quase Cheio' };
  return { c: 'lotado', t: 'Lotado' };
}

function render() {
  document.querySelector('.grid').innerHTML = setores.map((s, i) => {
    const st = getStatus(s);
    return `<div class="ponto ${st.c}" data-i="${i}">
      <h2>${s.nome}</h2>
      <p>Local: ${s.local}</p>
      <p>Capacidade: ${s.capacidade} vagas</p>
      <div class="controle-vagas">
        <button class="menos" data-i="${i}">-</button>
        <span class="qtd">${s.estacionadas}</span>
        <button class="mais" data-i="${i}">+</button>
      </div>
      <button class="info-btn" data-i="${i}">${s.expandido ? 'Ocultar' : 'Mais informações'}</button>
      <div class="info-extra" style="display:${s.expandido ? 'block' : 'none'}">
        Cobertura: ${s.coberto ? 'Coberto' : 'Ao ar livre'}<br>
        Vigilância: ${s.vigilancia ? 'Sim' : 'Não'}<br>
        Iluminação: ${s.iluminacao ? 'Sim' : 'Não'}
      </div>
      <span class="status ${st.c}">${st.t}</span>
    </div>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  render();
  document.querySelector('.grid').onclick = e => {
    const i = e.target.getAttribute('data-i');
    if (i !== null) {
      if (e.target.classList.contains('mais') && setores[i].estacionadas < setores[i].capacidade) setores[i].estacionadas++;
      else if (e.target.classList.contains('menos') && setores[i].estacionadas > 0) setores[i].estacionadas--;
      else if (e.target.classList.contains('info-btn')) setores[i].expandido = !setores[i].expandido;
      render();
    }
  };
});
