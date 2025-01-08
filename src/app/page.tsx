'use client';

import { useState } from 'react';
import styles from './RegisterProduct.module.css';

interface FormData {
  name: string;
  category: string;
  subcategory: string;
  description: string;
  imageUrl: string;
  imageUrl2: string;
  imageUrl3: string;
  imageUpload: File | null;
  imageUpload2: File | null;
  imageUpload3: File | null;
}

const RegisterProduct: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    subcategory: '',
    description: '',
    imageUrl: '',
    imageUrl2: '',
    imageUrl3: '',
    imageUpload: null,
    imageUpload2: null,
    imageUpload3: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Enviando os dados do formulário:', formData);

    // Valide antes de enviar, se necessário
    if (!formData.name || !formData.category) {
      console.error('Nome e categoria são obrigatórios');
      return;
    }

    // Lógica de envio (ex: envio para API)
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registro de Produto</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Nome</label>
          <input
            id="name"
            className={styles.input}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>Categoria</label>
          <input
            id="category"
            className={styles.input}
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="subcategory" className={styles.label}>Subcategoria</label>
          <input
            id="subcategory"
            className={styles.input}
            type="text"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroupFull}>
          <label htmlFor="description" className={styles.labelDescription}>Descrição</label>
          <textarea
            id="description"
            className={styles.textarea}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        {[1, 2, 3].map((index) => (
          <div className={styles.formGroup} key={`url${index}`}>
            <label htmlFor={`imageUrl${index}`} className={styles.label}>
              URL da Imagem {index}
            </label>
            <input
              id={`imageUrl${index}`}
              className={styles.input}
              type="url"
              name={`imageUrl${index}`}
              value={formData[`imageUrl${index}` as keyof FormData] as string}
              onChange={handleChange}
            />
          </div>
        ))}
        {[1, 2, 3].map((index) => (
          <div className={styles.formGroup} key={`upload${index}`}>
            <label htmlFor={`imageUpload${index}`} className={styles.label}>
              Upload de Imagem {index}
            </label>
            <input
              id={`imageUpload${index}`}
              className={styles.inputFile}
              type="file"
              name={`imageUpload${index}`}
              onChange={handleChange}
            />
          </div>
        ))}
        <button className={styles.button} type="submit">
          Registrar Produto
        </button>
      </form>
    </div>
  );
};

export default RegisterProduct;