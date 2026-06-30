/* ── NAV SCROLL & BACK TO TOP ── */
  const nav = document.getElementById('main-nav');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    // Nav com background branco ao fazer scroll
    nav.classList.toggle('scrolled', window.scrollY > 60);
    
    // Mostrar botão voltar ao topo depois de descer 300px
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  /* ── INTERSECTION OBSERVER para secções completas (fade-section) ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      } else {
        // Remove a classe quando sais da zona para a animação repetir
        e.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-section').forEach(el => observer.observe(el));

  /* ── INTERSECTION OBSERVER para itens em cascata (fade-grid / fade-item) ── */
  const gridObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const items = entry.target.querySelectorAll('.fade-item');
      
      if (entry.isIntersecting) {
        // 300ms de intervalo garante a suavidade perfeita em conjunto com a curva do CSS
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('visible');
          }, index * 300); 
        });
      } else {
        // Remove a classe de todos os itens para a animação poder repetir
        items.forEach(item => item.classList.remove('visible'));
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-grid').forEach(grid => gridObserver.observe(grid));

  /* ── LOCAL SELECT ── */
  function selectLocal(btn) {
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('local-input').value = btn.dataset.value;
  }

  /* ── LANCHE SELECT ── */
  function selectLanche(btn) {
    document.querySelectorAll('.lanche-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('lanche-input').value = btn.dataset.value;
  }

  /* ── SET MIN DATE ── */
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('data').min = today;

  /* ── FORM SUBMIT ── */
  document.getElementById('reservation-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const local     = document.getElementById('local-input').value === 'marco' ? 'Marco de Canaveses' : 'Feira Nova';
    const data      = document.getElementById('data').value;
    const hora      = document.getElementById('hora').value;
    const criancas  = document.getElementById('criancas').value;
    const lanche    = document.getElementById('lanche-input').value === 'sim' ? 'Sim' : 'Não';
    const nome      = document.getElementById('nome').value;
    const telefone  = document.getElementById('telefone').value;
    const notas     = document.getElementById('notas').value;

    const msg = encodeURIComponent(
      `🎉 *Pedido de Reserva – Bem Viver Party*\n\n` +
      `📍 *Espaço:* ${local}\n` +
      `📅 *Data:* ${data}\n` +
      `🕐 *Hora:* ${hora}\n` +
      `👧 *Crianças:* ${criancas}\n` +
      `🍰 *Lanche:* ${lanche}\n` +
      `👤 *Nome:* ${nome}\n` +
      `📞 *Telefone:* ${telefone}` +
      (notas ? `\n📝 *Notas:* ${notas}` : '')
    );

    /* Send via WhatsApp */
    window.open(`https://wa.me/351969228054?text=${msg}`, '_blank');

    /* Show success */
    this.style.display = 'none';
    document.getElementById('success-msg').classList.add('show');
  });

  /* ── GALLERY MODAL LOGIC ── */
  
  // Caminhos atualizados com './' para forçar a leitura a partir da pasta atual.
  // SE A PASTA ESTIVER DENTRO DE "img", SUBSTITUI "./Local_FeiraNova/" POR "img/Local_FeiraNova/"
  const galleries = {
    'feira-nova': [
      { src: 'img/Local_FeiraNova/LojaDentro..jpg', title: 'Interior do Espaço' },
      { src: 'img/Local_FeiraNova/InsufalvelBolas..jpg', title: 'Insuflável e Bolas' },
      { src: 'img/Local_FeiraNova/Discoteca..jpg', title: 'Discoteca' },
      { src: 'img/Local_FeiraNova/Bilhar.jpg', title: 'Mesa de Bilhar' },
      { src: 'img/Local_FeiraNova/SalaVestidos..jpg', title: 'Sala de Vestidos' }
    ]
  };

    const galleries_Marco = {
    'feira-nova': [
      { src: 'img/Local_FeiraNova/LojaDentro..jpg', title: 'Interior do Espaço' },
      { src: 'img/Local_FeiraNova/InsufalvelBolas..jpg', title: 'Insuflável e Bolas' },
      { src: 'img/Local_FeiraNova/Discoteca..jpg', title: 'Discoteca' },
      { src: 'img/Local_FeiraNova/Bilhar.jpg', title: 'Mesa de Bilhar' },
      { src: 'img/Local_FeiraNova/SalaVestidos..jpg', title: 'Sala de Vestidos' }
    ]
  };

  let currentGallery = [];
  let currentImageIndex = 0;
  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('gallery-img');
  const caption = document.getElementById('gallery-caption');

  function openGallery(id, event) {
    if (event) event.stopPropagation();
    currentGallery = galleries[id];
    currentImageIndex = 0;
    updateGalleryUI();
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; 
  }

  function closeGallery() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; 
  }

  function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = currentGallery.length - 1;
    if (currentImageIndex >= currentGallery.length) currentImageIndex = 0;
    updateGalleryUI();
  }

  function updateGalleryUI() {
    const currentItem = currentGallery[currentImageIndex];
    modalImg.src = currentItem.src;
    
    caption.innerHTML = `<span style="font-size: 1.2rem; font-weight: 900; color: #fff;">${currentItem.title}</span><br><span style="font-size: 0.8rem; font-weight: normal; opacity: 0.7;">Imagem ${currentImageIndex + 1} de ${currentGallery.length}</span>`;
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      closeGallery();
    }
  }