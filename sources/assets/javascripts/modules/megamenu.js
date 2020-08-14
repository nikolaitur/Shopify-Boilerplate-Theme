import $ from 'jquery';

export default function() {
  const $megamenuContents = $('[data-parent-link]');
  $megamenuContents.each(function(index, megamenuContent){
      console.log('megamenu');
      const parentLink = $(megamenuContent).data('parent-link');
      $('[data-megamenu=' + parentLink + ']').append($(megamenuContent).parent().html());
  })
}