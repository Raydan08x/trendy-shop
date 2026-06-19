export class SidebarMenu {
  constructor() {
    this.isInHtmlFolder = window.location.pathname.includes('/html/');
    this.basePath = this.isInHtmlFolder ? '../' : '';
    this.htmlPath = this.isInHtmlFolder ? '' : 'html/';
    this.sidebar = null;
    this.overlay = null;
    this.closeBtn = null;
  }

  getLink(page) {
    if (page === 'index.html') {
      return `${this.basePath}index.html`;
    }

    return `${this.htmlPath}${page}`;
  }

  getTemplate() {
    return `
      <aside class="sidebar" id="sidebar" aria-hidden="true">
        <div class="sidebar__header">
          <strong>Menu lateral</strong>
          <button id="closeSidebar" type="button" aria-label="Cerrar menu">Cerrar</button>
        </div>
        <nav class="sidebar__content" aria-label="Carrito">
          <a href="${this.getLink('index.html')}">Inicio</a>
          <a href="${this.getLink('catalogo.html')}">Catalogo</a>
          <a href="${this.getLink('contacto.html')}">Contacto</a>
          <a href="${this.getLink('carrito.html')}">Carrito</a>
        </nav>
      </aside>
      <div class="overlay" id="overlay"></div>
    `;
  }

  ensureMarkup() {
    const hasSidebar = document.getElementById('sidebar');
    const hasOverlay = document.getElementById('overlay');

    if (!hasSidebar || !hasOverlay) {
      document.body.insertAdjacentHTML('afterbegin', this.getTemplate());
    }

    this.sidebar = document.getElementById('sidebar');
    this.overlay = document.getElementById('overlay');
    this.closeBtn = document.getElementById('closeSidebar');
  }

  ensureStyles() {
    if (document.getElementById('sidebarMenuStyles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'sidebarMenuStyles';
      style.textContent = `
      .sidebar {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 30;
        width: min(320px, 82vw);
        height: 100vh;
        padding: 24px 20px;
        background:
          radial-gradient(circle at top left, rgba(233, 221, 207, 0.9), transparent 32%),
          linear-gradient(180deg, rgba(250, 249, 246, 0.98), rgba(245, 238, 229, 0.98));
        color: #1e1e1e;
        transform: translateX(+105%);
        transition: transform 0.25s ease;
        border-left: 1px solid rgba(102, 102, 102, 0.35);
        box-shadow: 0 24px 50px rgba(209, 122, 91, 0.22);
      }

      .sidebar.is-open {
        transform: translateX(0);
      }

      .sidebar__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding-bottom: 14px;
        border-bottom: 1px solid rgba(209, 122, 91, 0.2);
      }

      .sidebar__content {
        display: grid;
        gap: 12px;
        margin-top: 20px;
      }

      .sidebar__content a,
      #closeSidebar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 10px 14px;
        border: 1px solid rgba(209, 122, 91, 0.2);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.55);
        color: inherit;
        text-decoration: none;
        cursor: pointer;
        transition: transform 0.2s ease, color 0.2s ease, text-shadow 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
      }

      .sidebar__content a:hover,
      #closeSidebar:hover {
        transform: translateY(-1px);
        color: #e4764e;
        background: rgba(255, 255, 255, 0.78);
        text-shadow: 0 0 10px rgba(209, 122, 91, 0.6);
        box-shadow: 0 10px 24px rgba(209, 122, 91, 0.14);
      }

      .overlay {
        position: fixed;
        inset: 0;
        z-index: 20;
        background: rgba(102, 84, 73, 0.24);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.25s ease;
      }

      .overlay.is-active {
        opacity: 1;
        pointer-events: auto;
      }
    `;

    document.head.appendChild(style);
  }

  render() {
    this.ensureMarkup();
    this.ensureStyles();

    if (!this.sidebar || !this.overlay || !this.closeBtn) {
      return;
    }

    this.init();
  }

  init() {
    this.closeBtn.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', () => this.close());
    window.addEventListener('cart:open', () => this.open());
  }

  open() {
    this.sidebar.classList.add('is-open');
    this.sidebar.setAttribute('aria-hidden', 'false');
    this.overlay.classList.add('is-active');
  }

  close() {
    this.sidebar.classList.remove('is-open');
    this.sidebar.setAttribute('aria-hidden', 'true');
    this.overlay.classList.remove('is-active');
  }
}
