const express = require("express");
const router = express.Router();



let suppliers = [
  {
    id: 1,
    supplierName: "JNR Trading",
    contactPerson: "Jener b cabual",
    email: "cabualjener@gmail.com",
    phone: "09956673542",
    address: "Dumaguete City",
    products: ["Rice", "Cooking Oil"],
    status: "Active"
  },
  {
    id: 2,
    supplierName: "XYZ Supplies",
    contactPerson: "Maria Santos",
    email: "xyz@gmail.com",
    phone: "09181234567",
    address: "Mandaue City",
    products: ["Canned Goods", "Beverages"],
    status: "Active"
  }
];



router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: suppliers.length,
    data: suppliers
  });
});



router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const supplier = suppliers.find(
    (supplier) => supplier.id === id
  );

  if (!supplier) {
    return res.status(404).json({
      success: false,
      message: "Supplier not found"
    });
  }

  res.status(200).json({
    success: true,
    data: supplier
  });
});



router.post("/", (req, res) => {
  const {
    supplierName,
    contactPerson,
    email,
    phone,
    address,
    products,
    status
  } = req.body;

 
  if (
    !supplierName ||
    !contactPerson ||
    !email ||
    !phone ||
    !address
  ) {
    return res.status(400).json({
      success: false,
      message:
        "supplierName, contactPerson, email, phone, and address are required"
    });
  }

 
  const existingSupplier = suppliers.find(
    (supplier) =>
      supplier.email.toLowerCase() === email.toLowerCase()
  );

  if (existingSupplier) {
    return res.status(409).json({
      success: false,
      message: "A supplier with this email already exists"
    });
  }

  
  const newId =
    suppliers.length > 0
      ? Math.max(...suppliers.map((supplier) => supplier.id)) + 1
      : 1;

  const newSupplier = {
    id: newId,
    supplierName,
    contactPerson,
    email,
    phone,
    address,
    products: products || [],
    status: status || "Active"
  };

  suppliers.push(newSupplier);

  res.status(201).json({
    success: true,
    message: "Supplier created successfully",
    data: newSupplier
  });
});



router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const supplierIndex = suppliers.findIndex(
    (supplier) => supplier.id === id
  );

  if (supplierIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Supplier not found"
    });
  }

  const {
    supplierName,
    contactPerson,
    email,
    phone,
    address,
    products,
    status
  } = req.body;

  
  if (email) {
    const duplicateEmail = suppliers.find(
      (supplier) =>
        supplier.email.toLowerCase() === email.toLowerCase() &&
        supplier.id !== id
    );

    if (duplicateEmail) {
      return res.status(409).json({
        success: false,
        message: "Another supplier already uses this email"
      });
    }
  }

  const currentSupplier = suppliers[supplierIndex];

  suppliers[supplierIndex] = {
    ...currentSupplier,
    supplierName:
      supplierName || currentSupplier.supplierName,
    contactPerson:
      contactPerson || currentSupplier.contactPerson,
    email: email || currentSupplier.email,
    phone: phone || currentSupplier.phone,
    address: address || currentSupplier.address,
    products:
      products !== undefined
        ? products
        : currentSupplier.products,
    status: status || currentSupplier.status
  };

  res.status(200).json({
    success: true,
    message: "Supplier updated successfully",
    data: suppliers[supplierIndex]
  });
});



router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const supplierIndex = suppliers.findIndex(
    (supplier) => supplier.id === id
  );

  if (supplierIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Supplier not found"
    });
  }

  const deletedSupplier = suppliers.splice(
    supplierIndex,
    1
  )[0];

  res.status(200).json({
    success: true,
    message: "Supplier deleted successfully",
    data: deletedSupplier
  });
});


module.exports = router;
