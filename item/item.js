let isAdding = false;
let isEditing = false;
let selectedRow = null;

function Add() {
    if (isAdding || isEditing) return;

    const table = document.getElementById("product-list");
    const newRow = table.insertRow(-1);
    const nameCell = newRow.insertCell(0);
    const costCell = newRow.insertCell(1);

    nameCell.innerHTML = `<input type="text" id="productName" placeholder="Product Name" style="width: 100px;">`;
    costCell.innerHTML = `<input type="number" id="productCost" placeholder="Cost" style="width: 100px;">`;
    isAdding = true;
    document.getElementById("productName").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            saveProduct();
        }
    });
    document.getElementById("productCost").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            saveProduct();
        }
    });
}

function saveProduct() {
    const nameInput = document.getElementById("productName").value;
    const costInput = document.getElementById("productCost").value;
    if (nameInput && costInput) {
        const table = document.getElementById("product-list");
        const lastRow = table.rows[table.rows.length - 1];
        lastRow.cells[0].textContent = nameInput;
        lastRow.cells[1].textContent = `$${parseFloat(costInput).toFixed(2)}`;
        isAdding = false;
    } else {
        alert("Vui lòng nhập tên và giá sản phẩm.");
    }
}
function Remove() {
    const table = document.getElementById("product-list");
    if(table.rows.length > 1){
        table.deleteRow(table.rows.length - 1); 
        isAdding = false;
    } else {
        alert("Đã hết sản phẩm để xóa.");
    }
}

function Edit() {
    if (isAdding || isEditing) return; 
    const table = document.getElementById("product-list");
    for (let i = 1; i < table.rows.length; i++) { 
        table.rows[i].onclick = function () {
            if (selectedRow) {
                selectedRow.style.backgroundColor = ""; 
            }
            selectedRow = this; 
            selectedRow.style.backgroundColor = "#f0f0f0";
        };
    }
    if (selectedRow) {
        const nameCell = selectedRow.cells[0];
        const costCell = selectedRow.cells[1];
        nameCell.innerHTML = `<input type="text" id="editProductName" value="${nameCell.textContent}" style="width: 100px;">`;
        costCell.innerHTML = `<input type="number" id="editProductCost" value="${costCell.textContent.replace('$', '')}" style="width: 100px;">`;
        isEditing = true;
        document.getElementById("editProductName").addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                saveEdit();
            }
        });
        document.getElementById("editProductCost").addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                saveEdit();
            }
        });
    } else {
        alert("Chọn hàng để chỉnh sửa (Ấn vào Edit, chọn hàng và ấn lại vào Edit lần nữa!");
    }
}
function saveEdit() {
    const nameInput = document.getElementById("editProductName").value;
    const costInput = document.getElementById("editProductCost").value;

    if (nameInput && costInput) {
        selectedRow.cells[0].textContent = nameInput;
        selectedRow.cells[1].textContent = `$${parseFloat(costInput).toFixed(2)}`;
        selectedRow.style.backgroundColor = ""; 
        selectedRow = null;
        isEditing = false; 
    } else {
        alert("Vui lòng nhập tên và giá sản phẩm.");
    }
}
