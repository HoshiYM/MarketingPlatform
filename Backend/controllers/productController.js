const fs = require("fs");
const transporter = require("../middlewares/sendMail");

// Gửi mail giới thiệu sản phẩm
const sendMailProduct = async (req, res) => {
    let file = fs.readFileSync("./data/products.json", 'utf8');
    let products = JSON.parse(file)

    let email = 'thnhphan90@gmail.com';
    await transporter.sendMail({
        to: email,
        subject: "Giới thiệu sản phẩm",
        html:`<div class="card" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                                        max-width: 300px;
                                        margin: auto;
                                        text-align: center;
                                        font-family: arial;">
                <img src="${products[0].imgSrc}" alt="Denim Jeans" style="width:100%">
                <h1>${products[0].name}</h1>
                <p class="price">${products[0].price}đ</p>
                <p>${products[0].desc}</p>
                <p><button style="border: none;
                                outline: 0;
                                padding: 12px;
                                color: white;
                                background-color: #000;
                                text-align: center;
                                cursor: pointer;
                                width: 100%;
                                font-size: 18px;">
                Mua ngay</button></p>
            </div>`,
    });
};

// Hiển thị danh sách sản phẩm
const getAllProducts = async (req, res) => {
    try {
        let file = fs.readFileSync("./data/products.json", 'utf8');
        let products = JSON.parse(file)
    
        res.render("products", {
            layout: "main-layout",
            title: "Danh sách sản phẩm",
            products,
            user: req.user,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi tải trang: " + error.message });
    }
};

// const getProductDetails = async (req, res) => {
//     try {
//         const { barcode } = req.params;
//         const product = await Product.findOne({ barcode }).populate("category", "name").lean();

//         if (!product) {
//             return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm." });
//         }

//         if (!req.user.role === "Admin") {
//             delete product.importPrice;
//         }

//         res.render("product_details", { title: "Chi tiết sản phẩm", layout: "main-layout", product, user: req.user });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Lỗi khi lấy chi tiết sản phẩm: " + error.message });
//     }
// };

module.exports = {
    getAllProducts,
    // getProductDetails,
    sendMailProduct
};
