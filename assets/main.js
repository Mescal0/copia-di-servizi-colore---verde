/* main.js — interazioni lato client (nessuna dipendenza) */
(function () {
  "use strict";

  /* --- menu mobile --- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Chiudi menu" : "Apri menu");
    });
  }

  /* --- dropdown (click su mobile, hover via CSS su desktop) --- */
  document.querySelectorAll(".has-menu .menu-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var menu = btn.parentElement.querySelector(".menu");
      var open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".has-menu")) {
      document.querySelectorAll(".menu.open").forEach(function (m) {
        m.classList.remove("open");
        var b = m.parentElement.querySelector(".menu-btn");
        if (b) b.setAttribute("aria-expanded", "false");
      });
    }
  });

  /* --- form contatti -> WhatsApp --- */
  var form = document.getElementById("quoteForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var wa = form.getAttribute("data-wa");
      var get = function (n) {
        var el = form.querySelector('[name="' + n + '"]');
        return el ? String(el.value || "").trim() : "";
      };
      var nome = get("nome");
      var recapito = get("recapito");
      var servizio = get("servizio");
      var zona = get("zona");
      var messaggio = get("messaggio");

      var lines = ["Salve, vorrei un preventivo gratuito."];
      if (nome) lines.push("Nome: " + nome);
      if (servizio) lines.push("Servizio: " + servizio);
      if (zona) lines.push("Zona: " + zona);
      if (messaggio) lines.push("Dettagli: " + messaggio);
      if (recapito) lines.push("Mi trovate al: " + recapito);

      var url = "https://wa.me/" + wa + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
    });
  }
})();
