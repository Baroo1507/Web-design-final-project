function updatecart() {
    var cart_items = document.getElementsByClassName("cart-item");
    var total = 0;
    var total_quantity = 0; // Biến để theo dõi tổng số lượng sản phẩm
    var shipping_fee = 50000; // Phí vận chuyển

    for (var i = 0; i < cart_items.length; i++) {
        var cart_row = cart_items[i];
        var price_item = cart_row.getElementsByClassName("cart-item__total-price")[0];
        var quantity_item = cart_row.getElementsByClassName("cart-item-quantity-input")[0];

        // Loại bỏ các ký tự không phải số ngoại trừ dấu phẩy và dấu chấm, sau đó loại bỏ dấu phẩy
        var price_text = price_item.innerText.replace(/[^0-9.,-]+/g, "").replace(/,/g, "");
        var price = parseFloat(price_text); // Chuyển đổi chuỗi đã làm sạch sang số

        // Lấy giá trị số lượng và đảm bảo nó là số nguyên
        var quantity = parseInt(quantity_item.value);

        // Thêm vào tổng chi phí
        total += price * quantity;

        // Thêm vào tổng số lượng
        total_quantity += quantity;
    }

    // Tính tổng cuối cùng bao gồm phí vận chuyển
    var final_total = total + shipping_fee;

    // Cập nhật phần tử giá tổng cộng trong giỏ hàng
    document.getElementsByClassName("cart__total-price")[0].innerText = total.toLocaleString("vi-VN") + "đ";

    // Cập nhật phần tử giá phí vận chuyển trong giỏ hàng
    document.getElementsByClassName("cart__shipping-price")[0].innerText = shipping_fee.toLocaleString("vi-VN") + "đ";

    // Cập nhật phần tử tổng đơn trong giỏ hàng
    document.getElementsByClassName("cart-final")[0].innerText = final_total.toLocaleString("vi-VN") + "đ";

    // Cập nhật phần tử tổng số lượng sản phẩm trong giỏ hàng
    document.getElementsByClassName("cart__total-quantity")[0].innerText = total_quantity;
}

// Cập nhật giỏ hàng khi số lượng thay đổi
var quantity_inputs = document.getElementsByClassName("cart-item-quantity-input");
for (var i = 0; i < quantity_inputs.length; i++) {
    var input = quantity_inputs[i];
    input.addEventListener("change", function (event) {
        var input = event.target;

        // Đảm bảo số lượng ít nhất là 1
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }

        // Cập nhật tổng giỏ hàng
        updatecart();
    });
}

// Cập nhật ban đầu
updatecart();
