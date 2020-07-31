import $ from 'jquery';
import CartJS from '/vendor/cart.min.js';
import tinybind from 'tinybind';
import { formatMoney } from '/tools/moneyFormats';
import PerfectScrollbar from 'perfect-scrollbar';

const $variantsSelector = $('[data-all-variants]');
let data = {
  cart: {},
  update(newCart) {
    this.cart = newCart
  },
  setRedirect() {
    localStorage.setItem('redirect_to_checkout', true);
  }
};
let open = false;
const $minicart = $('[data-minicart]');
const scrollBar = new PerfectScrollbar('.minicart__items');


const addToCart = function(id, qty, properties) {
  let data = {
    "quantity": qty,
    "id": id,
    "properties": {}
  }
  if (properties['shipping_interval_frequency'] && properties['shipping_interval_unit_type'] && properties['subscription_id']) {
    data["properties"]["shipping_interval_frequency"] = properties['shipping_interval_frequency'];
    data["properties"]["shipping_interval_unit_type"] = properties['shipping_interval_unit_type'];
    data["properties"]["subscription_id"] = properties['subscription_id'];
  }
  console.log(data);

  $.ajax({
    type: 'POST',
    url: '/cart/add.js',
    data: data,
    dataType: 'json',
    success: function () {
      open = true;
      updateMinicart();
    },
    error: function () {
      console.error("Can't add item to cart")
    }
  });
}

const getProperties = function() {
  let properties = []
  $('[data-product-property]').each(function (index, element) {
    let key = $(element).data('product-property');
    let value = $(element).val();
    if (key && key != 'hidden' && value) {
      properties[key] = value;
    }
  });
  return properties;
}

const addToCartHandler = function () {
  const $variantSelected = $('option:selected', $variantsSelector);
  let variantId = $variantSelected.val();
  if ($variantSelected.data('discount-variant-id') != '') {
    variantId = $variantSelected.data('discount-variant-id');
  }
  const qty = $('[data-qty]').val() || 1;
  let properties = getProperties();
  console.log(variantId);
  if (variantId) {
    addToCart(variantId, qty, properties);
  } else if ($('[data-all-variants] option:selected').data('multi-variants')) {
    let $variants = $('[data-all-variants] option:selected').data('multi-variants');
    $variants.forEach(function(id) {
      console.log(id);
      addToCart(id, qty, properties);
    });
  } else {
    console.error("minicart.js: can't add item to cart, wrong variantId", variantId);
  }
}


const removeFromCart = function () {
  if ($(this).data('line') != undefined) {
    let id = $(this).data('line');
    if (id != undefined) {
      console.log("remove", id);
      CartJS.removeItem(id + 1);
    } else {
      console.error("Can't remove item", id, " from the cart!");
    }
  } else {
    console.error("Can't remove item to the cart since data-line is not present in the remove-from-cart button!");
  }
}


const updateMinicart = function() {
  $.get('/cart.js', function(response) {
    const newCart = JSON.parse(response);
    data.update(newCart);
    scrollBar.update();
    updateCartCount();
    if (open) {
      $minicart.addClass('is-open');
      open = false;
    }
  }).fail(function() {
    console.error('minicart.js: updateMinicart error')
  })
}

const updateCartCount = function() {
  let cartCount = '[data-cart-count]';
  $(cartCount).text(data.cart.item_count);
}

const eventHandlers = function() {
  $('[data-add-to-cart]').on('click', function(e) {
    e.preventDefault();
    addToCartHandler();
  });

  $(document).on('click', '[data-remove-from-cart]', removeFromCart);

  $('[data-minicart-toggle]').on('click', function(e) {
    e.preventDefault();
    $minicart.toggleClass('is-open');
  });



  $(document).on('cart.requestComplete', function (event, cart) {
    updateMinicart();

  });
  $(document).ready(function() {
    updateMinicart();
  });
}

const init = function() {
  if (tinybind) {
    tinybind.formatters.formatMoney = formatMoney;
    tinybind.formatters.isDefaultTitle = function (title) {
      if (title.toLowerCase() == "default title") return true;
      return false;
    };
    tinybind.formatters.append = function(value, append) {
      return value+append;
    }
    tinybind.formatters.convert = function(value, append) {
      if (append) {
        return '/products/'+append;
      }
      return value
    }
    tinybind.bind($minicart, data);
  } else {
    console.error("minicart.js: Tinybind template library is not connected");
    return false;
  }
  
}

export default function() {
  init();
  eventHandlers();
}
