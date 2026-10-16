/**
 * Peaceful Heart Coffee - Official Community QR Modal Manager
 */

export class CommunityQRModal {
  constructor() {
    this.modal = document.getElementById('communityModal');
    this.openBtns = document.querySelectorAll('.js-open-community');
    this.closeBtn = document.getElementById('btnCloseCommunity');
    this.zoomModal = document.getElementById('qrZoomModal');
    this.zoomImg = document.getElementById('qrZoomImg');
    this.zoomCloseBtn = document.getElementById('btnCloseZoom');

    this.init();
  }

  init() {
    if (!this.modal) return;

    // Open triggers
    this.openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    // Close trigger
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Backdrop click close
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Zoom on QR images
    document.querySelectorAll('.qr-img-wrapper').forEach(wrap => {
      wrap.addEventListener('click', () => {
        const img = wrap.querySelector('img');
        if (img && this.zoomModal && this.zoomImg) {
          this.zoomImg.src = img.src;
          this.zoomModal.classList.add('active');
        }
      });
    });

    if (this.zoomCloseBtn && this.zoomModal) {
      this.zoomCloseBtn.addEventListener('click', () => {
        this.zoomModal.classList.remove('active');
      });
      this.zoomModal.addEventListener('click', (e) => {
        if (e.target === this.zoomModal) {
          this.zoomModal.classList.remove('active');
        }
      });
    }

    // ESC key closes any open modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.zoomModal && this.zoomModal.classList.contains('active')) {
          this.zoomModal.classList.remove('active');
        } else if (this.modal.classList.contains('active')) {
          this.close();
        }
      }
    });
  }

  open() {
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
