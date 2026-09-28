const coverCopy = {
  pt: { title: 'Redes de<br>Computadores', subtitle: 'Uma trilha interativa para compreender, configurar, utilizar e diagnosticar redes — do enlace Ethernet ao endereçamento, switching e routing.', action: 'Explorar trilha' },
  en: { title: 'Computer<br>Networks', subtitle: 'An interactive learning path to understand, configure, use and troubleshoot networks — from Ethernet links to addressing, switching and routing.', action: 'Explore course' },
  es: { title: 'Redes de<br>Computadoras', subtitle: 'Una ruta interactiva para comprender, configurar, utilizar y diagnosticar redes — desde el enlace Ethernet hasta el direccionamiento, switching y routing.', action: 'Explorar curso' }
};

document.querySelectorAll('.language-switch button').forEach((button) => {
  button.addEventListener('click', () => {
    const copy = coverCopy[button.dataset.lang];
    document.getElementById('course-title').innerHTML = copy.title;
    document.getElementById('course-subtitle').textContent = copy.subtitle;
    document.querySelector('.primary').textContent = copy.action;
    document.querySelectorAll('.language-switch button').forEach((item) => item.classList.toggle('active', item === button));
  });
});
