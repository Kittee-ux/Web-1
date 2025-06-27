// Dados dos setores
const setores = [
  { nome: 'Bloco de Engenharia', local: 'Bloco A', capacidade: 15, estacionadas: 6, coberto: true, vigilancia: true, iluminacao: false },
  { nome: 'Biblioteca', local: 'Biblioteca Central', capacidade: 15, estacionadas: 12, coberto: false, vigilancia: false, iluminacao: true },
  { nome: 'Bloco de T.I', local: 'Bloco B', capacidade: 15, estacionadas: 10, coberto: true, vigilancia: true, iluminacao: true }
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
    return `<div class="ponto ${st.c}" tabindex="0">
      <h2>${s.nome}</h2>
      <p>Local: ${s.local}</p>
      <p>Capacidade: ${s.capacidade} vagas</p>
      <div class="controle-vagas">
        <button class="menos" data-i="${i}" aria-label="Diminuir vagas">-</button>
        <span class="qtd">${s.estacionadas}</span>
        <button class="mais" data-i="${i}" aria-label="Aumentar vagas">+</button>
      </div>
      <div class="info-extra">
        <span>${s.coberto ? 'Coberto' : 'Ao ar livre'}</span>
        <span>${s.vigilancia ? 'Vigilância' : ''}</span>
        <span>${s.iluminacao ? 'Iluminação' : ''}</span>
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
      if (e.target.classList.contains('menos') && setores[i].estacionadas > 0) setores[i].estacionadas--;
      render();
    }
  };
});
