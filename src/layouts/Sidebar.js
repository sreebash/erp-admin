import MetisMenu from "@metismenu/react";
import Link from "next/link";
import {useEffect, useState} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
// import { sideBarActive } from "../redux/action/utils";
const Sidebar = () => {
    const [loveEmoji, setLoveEmoji] = useState(false);
    const [doc, setDoc] = useState();
    useEffect(() => {
        setDoc(window);
        // sideBarActive(doc);
    }, [doc]);
    // sideBarActive(doc);
    let path = doc && doc.location.pathname;
    path = path && path.split("/");
    path = path && path[path.length - 1];
    console.log("path", path)
    let dashboard = [
            "dashboard"
        ],
        category = [
            "inventory/category",
        
        ],
        brand = [
            "inventory/brand",
        
        ],
        unit = [
            "inventory/unit",
        
        ],
        productAttribute = [
            "inventory/productAttribute",
        
        ],
        product = [
            "inventory/product",
        
        ],
        warehouse = [
            "inventory/warehouse",
        
        ]
    
    
    return (
        <div className="deznav">
            {doc && (
                <PerfectScrollbar className="deznav-scroll">
                    <MetisMenu className="metismenu" id="menu">
                        
                        <li className={`${dashboard.includes(path) ? "mm-active" : ""}`}>
                            <Link href="/">
                                <a className="ai-icon" aria-expanded="false">
                                    <i className="flaticon-013-checkmark"/>
                                    <span className="nav-text">Dashboard</span>
                                </a>
                            </Link>
                        </li>
                        
                        <li className={`${category.includes(path) ? "mm-active" : ""}`}>
                            <a className="has-arrow ai-icon c-pointer" aria-expanded="false">
                                <i className="flaticon-050-info"/>
                                <span className="nav-text">Inventory</span>
                            </a>
                            <ul aria-expanded="false">
                                <li>
                                    <Link href="/inventory/category">
                                        <a
                                            className={`${
                                                path === "inventory/category" ? "mm-active" : ""
                                            }`}
                                        >
                                            Category
                                        </a>
                                    </Link>
                                </li>
                                
                                <li>
                                    <Link href="/inventory/brand">
                                        <a
                                            className={`${
                                                path === "inventory/brand" ? "mm-active" : ""
                                            }`}
                                        >
                                            Brand
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/inventory/unit">
                                        <a
                                            className={`${
                                                path === "inventory/unit" ? "mm-active" : ""
                                            }`}
                                        >
                                            Unit
                                        </a>
                                    </Link>
                                </li>
                                
                                <li>
                                    <Link href="/inventory/productAttribute">
                                        <a
                                            className={`${
                                                path === "inventory/productAttribute" ? "mm-active" : ""
                                            }`}
                                        >
                                            Product Attribute
                                        </a>
                                    </Link>
                                </li>
                                
                                
                                <li>
                                    <Link href="/inventory/product">
                                        <a
                                            className={`${
                                                path === "inventory/product" ? "mm-active" : ""
                                            }`}
                                        >
                                            Product
                                        </a>
                                    </Link>
                                </li>
                                
                                <li>
                                    <Link href="/inventory/warehouse">
                                        <a
                                            className={`${
                                                path === "inventory/warehouse" ? "mm-active" : ""
                                            }`}
                                        >
                                            Warehouse
                                        </a>
                                    </Link>
                                </li>
                                
                                <li>
                                    <Link href="/inventory/warehouseProducts">
                                        <a
                                            className={`${
                                                path === "inventory/warehouseProducts" ? "mm-active" : ""
                                            }`}
                                        >
                                            Warehouse Products
                                        </a>
                                    </Link>
                                </li>
                                
                                <li>
                                    <Link href="/inventory/productVariant">
                                        <a
                                            className={`${
                                                path === "inventory/productVariant" ? "mm-active" : ""
                                            }`}
                                        >
                                            Product Variant
                                        </a>
                                    </Link>
                                </li>
                                
                                <li>
                                    <Link href="/inventory/productStock">
                                        <a
                                            className={`${
                                                path === "inventory/productStock" ? "mm-active" : ""
                                            }`}
                                        >
                                            Product Stock
                                        </a>
                                    </Link>
                                </li>
                                
                                
                                <li>
                                    <Link href="/inventory/supplier">
                                        <a
                                            className={`${
                                                path === "inventory/supplier" ? "mm-active" : ""
                                            }`}
                                        >
                                            Supplier
                                        </a>
                                    </Link>
                                </li>
                                
                                
                                <li>
                                    <Link href="/inventory/purchase">
                                        <a
                                            className={`${
                                                path === "inventory/purchase" ? "mm-active" : ""
                                            }`}
                                        >
                                            Purchase
                                        </a>
                                    </Link>
                                </li>
                                
                                <li>
                                    <Link href="/inventory/sales">
                                        <a
                                            className={`${
                                                path === "inventory/sales" ? "mm-active" : ""
                                            }`}
                                        >
                                            Sales
                                        </a>
                                    </Link>
                                </li>
                            
                            
                            </ul>
                        </li>
                    
                    
                    </MetisMenu>
                    <div className="copyright">
                        <p>
                            <strong>Uena Admin Dashboard</strong> © {new Date().getFullYear()}{" "}
                            All Rights Reserved
                        </p>
                        <p>
                            Made with{" "}
                            <span
                                className={`${loveEmoji ? "heart heart-blast" : "heart"}`}
                                onClick={() => setLoveEmoji(!loveEmoji)}
                            ></span>{" "}
                            by DexignZone
                        </p>
                    </div>
                </PerfectScrollbar>
            )}
        </div>
    );
};

export default Sidebar;
