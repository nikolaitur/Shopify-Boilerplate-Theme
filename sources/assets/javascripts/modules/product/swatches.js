import $ from 'jquery';
import { formatMoney } from '/tools/moneyFormats';

const $variantsSelector = $('[data-all-variants]');
const $productOption = $('[data-product-option]');
const $qtySelector = $('[data-qty]');

const updateProduct = function ($productForm) {
  const $variantSelected = $('option:selected', $productForm.find('[data-all-variants]'));
  updatePrice($variantSelected, $productForm);
  updateOptions($variantSelected, $productForm);
  updateButton($variantSelected, $productForm);
  updateLowStock($variantSelected, $productForm);
  updateTopLabel($variantSelected, $productForm);
  // updateRecharge($variantSelected);
}

const updatePrice = function($variantSelected, $productForm) {
  const $price = $productForm.find('[data-price]');
  const $priceCompare = $productForm.find('[data-price-compare]');
  const price = $variantSelected.data('variant-price');
  const comparePrice = $variantSelected.data('variant-compare-price');
  $price.text(formatMoney(price));
  comparePrice > 0 ? $priceCompare.text(formatMoney(comparePrice)).show() : $priceCompare.hide();
}

const updateButton = function($variantSelected, $productForm) {
  const $addToCart = $productForm.find('[data-add-to-cart]');
  if ($variantSelected.data('subscription-id') != '') {
    let text = window.theme.strings.recharge;
    if ($variantSelected.data('product-handle').indexOf('annual') != -1) {
      let price = formatMoney($variantSelected.data('variant-price'));
      text += ' - '+price;
    }
    $addToCart.attr('disabled', false).text(text);
  } else if ($variantSelected.data('available') == true) {
    if ($variantSelected.data('inventory-policy') == 'continue' && $variantSelected.data('inventory-quantity') <= 0) {
      $addToCart.attr('disabled', false).text(window.theme.strings.preOrder);
    } else {
      $addToCart.attr('disabled', false).text(window.theme.strings.addToCart);
    }
  } else {
    $addToCart.attr('disabled', true).text(window.theme.strings.soldOut);
  }
}

const updateTopLabel = function($variantSelected, $productForm) {
  const $topLabel = $productForm.find('.product-info__top-label').find('span');
  if ($variantSelected.data('product-handle').indexOf('annual') != -1 && $variantSelected.data('subscription-id') != '' && $topLabel.length) {
    let text = window.theme.strings.recharge;
    let price = formatMoney($variantSelected.data('variant-price'));
    text += ' - ' + price;
    text = $(`<b>${text}</b>`);
    $topLabel.html(text);
  }
}

const updateLowStock = function($variantSelected, $productForm) {
  const $lowStock = $productForm.find('[data-low-stock]');
  if ($variantSelected.data('available')) {
    $lowStock.removeClass('hide');
  } else {
    $lowStock.addClass('hide');
  }
}

const updateOptions = function($variantSelected, $productForm) {
  // Update option 1
  $('[data-product-option=1]').each(function (index, option1) {
    const $productForm = $(this).closest('[data-product-form]');
    let disabled = true;
    const optionVal = $(option1).val();
    $productForm.find('[data-all-variants]').find('option').each(function (index, selectOption) {
      if ($(selectOption).data('option1') == optionVal && $(selectOption).data('available') == true) {
        disabled = false;
      }
    });
    if (disabled) {
      // $(option1).attr('disabled', true);
      $(option1).addClass('is-disabled');
    }
  });

  // Update options 2 and 3
  const option1 = $variantSelected.data('option1');
  $productForm.find('[data-all-variants]').find('option').each(function (index, selectOption) {
    if ($(selectOption).data('option1') == option1) {
      const option2 = $(selectOption).data('option2');
      const $option2 = $(`[data-product-option=2][value='${option2}']`);
      const option3 = $(selectOption).data('option3');
      const $option3 = $(`[data-product-option=3][value='${option3}']`);
      if ($(selectOption).data('available') == false) {
        // $option2.attr('disabled', true);
        // $option3.attr('disabled', true);
        $(option2).addClass('is-disabled');
        $(option3).addClass('is-disabled');
      } else {
        $option2.attr('disabled', false);
        $option3.attr('disabled', false);
      }
    }
  });
}

export default function() {
  // Variants changing (automatically triggers from options changing)
  $variantsSelector.on('change', function() {
    updateProduct($(this).closest('[data-product-form]'));
  });

  $qtySelector.on('change', function() {
    updateProduct($(this).closest('[data-product-form]'));
  });

  // Options changing
  $productOption.on('click', function () {
    const option1 = $('[data-product-option=1]:checked').length ? $('[data-product-option=1]:checked').val() : '_BLANK_';
    const option2 = $('[data-product-option=2]:checked').length ? $('[data-product-option=2]:checked').val() : '_BLANK_';
    const option3 = $('[data-product-option=3]:checked').length ? $('[data-product-option=3]:checked').val() : '_BLANK_';
    console.log(option1, option2, option3);
    const value = $variantsSelector.find(`[data-option1='${option1}'][data-option2='${option2}'][data-option3='${option3}']`).val();
    $variantsSelector.val(value).trigger('change');
    console.log('variantselector value', $variantsSelector.val());
  });

  if (window.productTemplateLoaded) {
    updateProduct($('.product-main').find('[data-product-form]'));
  }
}