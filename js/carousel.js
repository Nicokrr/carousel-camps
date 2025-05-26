$(function(){

  function moveToSelected(element) {
    let $selected;
    if (element === "next") {
      $selected = $(".selected").next();
    } else if (element === "prev") {
      $selected = $(".selected").prev();
    } else {
      $selected = $(element);
    }

    const $next       = $selected.next();
    const $prev       = $selected.prev();
    const $prevSecond = $prev.prev();
    const $nextSecond = $next.next();

    // Limpiamos clases anteriores
    $(".selected, .prev, .prevLeftSecond, .next, .nextRightSecond, .hideLeft, .hideRight")
      .removeClass();

    // Aplicamos nuevas posiciones
    $selected   .addClass("selected");
    $prev       .addClass("prev");
    $next       .addClass("next");
    $prevSecond .addClass("prevLeftSecond");
    $nextSecond .addClass("nextRightSecond");
    $nextSecond.nextAll().addClass("hideRight");
    $prevSecond.prevAll().addClass("hideLeft");
  }

  // Flechas de teclado
  $(document).keydown(function(e) {
    if (e.which === 37)      moveToSelected('prev');
    else if (e.which === 39) moveToSelected('next');
    else return;
    e.preventDefault();
  });

  // Clic en el slide (cualquier parte del div)
  $('#carousel div').click(function() {
    moveToSelected(this);
  });

  // Botones Prev/Next
  $('#prev').click(() => moveToSelected('prev'));
  $('#next').click(() => moveToSelected('next'));

  // === LIGHTBOX ZOOM ===
  // Doble-clic para agrandar
  $('#carousel img').on('dblclick', function(){
    const src = $(this).attr('src');
    $('#modal img').attr('src', src);
    $('#modal').addClass('show');
  });

  // Cerrar con la X
  $('#modal #close').on('click', function(){
    $('#modal').removeClass('show');
  });

  // Cerrar clicando fuera de la imagen
  $('#modal').on('click', function(e){
    if (e.target.id === 'modal') {
      $('#modal').removeClass('show');
    }
  });

});
