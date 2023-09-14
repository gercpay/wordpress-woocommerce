const $payment        = document.getElementById( 'payment' );
const $payment_method = document.getElementById( "payment_method_gercpay" );

// Check for checkout currency is allowed
window.addEventListener(
	"load",
	function(event) {
		if ($payment) {
			$payment.addEventListener(
				'change',
				function (event) {
					const $button_submit = document.getElementById( 'place_order' );
					if ($payment_method && $payment_method.checked === true && ! isAllowedCurrency) {
						createCurrencyWarning();
						$button_submit.disabled = true;
					} else {
						const $warning = document.getElementById( 'wcp-currency-warning' );
						if ($warning) {
							$warning.remove();
							$button_submit.disabled = false;
						}
					}
				},
				false
			);
		}
	}
);

var createCurrencyWarning = function () {
	this.currencyWarning = document.createElement( 'div' );
	this.currencyWarning.setAttribute( 'id', 'wcp-currency-warning' );
	this.currencyWarning.setAttribute( 'role', 'alert' );
	this.currencyWarning.classList.add( 'wcp-warning' );
	this.currencyWarning.classList.add( 'woocommerce-error' );
	this.currencyWarning.innerHTML = 'The selected currency is not allowed';
	$payment_method.parentNode.appendChild( this.currencyWarning );
};
