"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import { useAuth } from "@/hooks/useAuth";
import apiClient from "@/services/api";
import "@/styles/app-css/admin.css";

interface Product {
  id: number;
  name: string;
  description: string;
  categoryPrices: { category: string; price: number }[];
  active: boolean;
}

export default function AdminServicos() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryPrices: [],
    active: true,
  });

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "ADMIN")) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/products/admin/all");
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = async () => {
    try {
      if (selectedProduct) {
        await apiClient.patch(`/products/${selectedProduct.id}`, formData);
      } else {
        await apiClient.post("/products", formData);
      }
      fetchProducts();
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      categoryPrices: product.categoryPrices,
      active: product.active,
    });
    setShowModal(true);
  };

  const handleInactivateProduct = async (id: number) => {
    try {
      await apiClient.patch(`/products/${id}/inactivate`);
      fetchProducts();
    } catch (error) {
      console.error("Erro ao inativar produto:", error);
    }
  };

  if (authLoading || (user?.role === "ADMIN" && loading)) {
    return (
      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-content">
          <div className="admin-header">
            <h1 className="page-title">Carregando...</h1>
          </div>
        </main>
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">
        <div className="admin-header">
          <h1 className="page-title">Gerenciar Serviços</h1>
          <p className="page-subtitle">
            Visualize, edite e gerencie todos os serviços
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => {
            setSelectedProduct(null);
            setFormData({
              name: "",
              description: "",
              categoryPrices: [],
              active: true,
            });
            setShowModal(true);
          }}
        >
          Cadastrar Novo Serviço
        </button>

        <div className="dashboard-section">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Preços por Categoria</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{ textAlign: "center", padding: "2rem" }}
                    >
                      Nenhum produto encontrado
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>
                        {product.categoryPrices
                          .map(
                            (catPrice) =>
                              `${
                                catPrice.category
                              }: R$ ${catPrice.price.toFixed(2)}`
                          )
                          .join(", ")}
                      </td>
                      <td>{product.active ? "Ativo" : "Inativo"}</td>
                      <td>
                        <button
                          className="btn-action btn-edit"
                          onClick={() => handleEditProduct(product)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn-action btn-inactivate"
                          onClick={() => handleInactivateProduct(product.id)}
                        >
                          Inativar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title">
                {selectedProduct ? "Editar Serviço" : "Cadastrar Serviço"}
              </h3>

              <div className="form-group">
                <label>Nome:</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Descrição:</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Preços por Categoria:</label>
                {formData.categoryPrices.map((catPrice, index) => (
                  <div key={index} className="category-price-row">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Categoria"
                      value={catPrice.category}
                      onChange={(e) => {
                        const updatedPrices = [...formData.categoryPrices];
                        updatedPrices[index].category = e.target.value;
                        setFormData({
                          ...formData,
                          categoryPrices: updatedPrices,
                        });
                      }}
                    />
                    <input
                      type="number"
                      className="form-input"
                      placeholder="Preço"
                      value={catPrice.price}
                      onChange={(e) => {
                        const updatedPrices = [...formData.categoryPrices];
                        updatedPrices[index].price = parseFloat(e.target.value);
                        setFormData({
                          ...formData,
                          categoryPrices: updatedPrices,
                        });
                      }}
                    />
                    <button
                      className="btn-secondary btn-remove"
                      onClick={() => {
                        const updatedPrices = formData.categoryPrices.filter(
                          (_, i) => i !== index
                        );
                        setFormData({
                          ...formData,
                          categoryPrices: updatedPrices,
                        });
                      }}
                    >
                      Remover
                    </button>
                  </div>
                ))}
                <button
                  className="btn-primary btn-add"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      categoryPrices: [
                        ...formData.categoryPrices,
                        { category: "", price: 0 },
                      ],
                    });
                  }}
                >
                  Adicionar Categoria
                </button>
              </div>

              <div className="form-group">
                <label>Status:</label>
                <select
                  className="form-select"
                  value={formData.active ? "active" : "inactive"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      active: e.target.value === "active",
                    })
                  }
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>

              <div className="modal-actions">
                <button
                  className="btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button className="btn-primary" onClick={handleSaveProduct}>
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
