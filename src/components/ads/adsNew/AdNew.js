import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUi } from "../../../store/selectors";
import { resetError } from "../../../store/slices/ui";
import ErrorModal from "../../shared/modal/ErrorModal";
import Spinner from "../../shared/spinner/Spinner";
import Layout from "../../layout/Layout";
import { useTranslation } from "react-i18next";
import { adsCreate } from "../../../store/slices/ads";
import Form from "../../shared/form/Form";

function AdNew() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);

  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    onSale: true,
    price: "",
    category: "",
    description: "",
    status: "",
    coin: "",
  });

  const adNew = {
    name: formData.name,
    onSale: formData.onSale,
    price: formData.price,
    category: formData.category,
    description: formData.description,
    status: formData.status,
    coin: formData.coin,
    image: image ? image.image : null,
  };

  const handleChangeInputFile = e => {
    setImage({ ...image, image: e.target.files[0] });
  };

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(adsCreate(adNew));
    console.log("anuncio", adNew);
  };

  // const handleChangeInputFile = e => {
  //   setImage(e.target.files[0]);
  //   console.log("Selected image file:", e.target.files[0]);
  // };

  const handleErrorClick = () => {
    dispatch(resetError());
  };

  const buttonDisabled =
    !formData.name ||
    !formData.onSale ||
    !formData.price ||
    !formData.category ||
    !formData.description ||
    !formData.status ||
    !formData.coin;

  return (
    <Layout title="sube un anuncio">
      {isLoading ? (
        <Spinner message="Cargando..." />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="container-form"
          encType="multipart/form-data">
          <Form
            classNameLabel="form-label"
            htmlFor="adname"
            text={t("Article")}
            classNameInput="form-input"
            inputId="adname"
            inputType="text"
            inputName="name"
            value={formData.name}
            handleChange={handleChange}
            placeholder="name"
          />

          <div>
            <Form
              classNameLabel="form-label"
              htmlFor="onsale"
              text={t("Sell")}
              classNameInput="form-input"
              inputId="onsale"
              inputType="radio"
              inputName="onSale"
              value={true}
              handleChange={handleChange}
              placeholder="name"
              required
            />
            <Form
              classNameLabel="form-label"
              htmlFor="onsale"
              text={t("Buy")}
              classNameInput="form-input"
              inputId="onsale"
              inputType="radio"
              inputName="onSale"
              value={false}
              handleChange={handleChange}
              placeholder="name"
              required
            />
          </div>

          <Form
            classNameLabel="form-label"
            htmlFor="price"
            text={t("Price")}
            classNameInput="form-input"
            inputId="price"
            inputType="text"
            inputName="price"
            value={formData.price}
            handleChange={handleChange}
            placeholder="price"
            required
          />
          <Form
            classNameLabel="form-label"
            htmlFor="category"
            text={t("Category")}
            classNameInput="form-input"
            inputId="category"
            inputType="text"
            inputName="category"
            value={formData.category}
            handleChange={handleChange}
            placeholder="category"
            required
          />
          <Form
            classNameLabel="form-label"
            htmlFor="description"
            text={t("Description")}
            classNameInput="form-input"
            inputId="description"
            inputType="text"
            inputName="description"
            value={formData.description}
            handleChange={handleChange}
            placeholder="description"
            required
          />
          <Form
            classNameLabel="form-label"
            htmlFor="status"
            text={t("Status")}
            classNameInput="form-input"
            inputId="status"
            inputType="text"
            inputName="status"
            value={formData.status}
            handleChange={handleChange}
            placeholder="status"
            required
          />
          <Form
            classNameLabel="form-label"
            htmlFor="coin"
            text={t("Coin")}
            classNameInput="form-input"
            inputId="coin"
            inputType="text"
            inputName="coin"
            value={formData.coin}
            handleChange={handleChange}
            placeholder="coin"
            required
          />
          <Form
            classNameLabel="form-label-img"
            htmlFor="img"
            text={t("Image")}
            classNameInput="form-input"
            inputId="img"
            inputName="image"
            inputType="file"
            accept="image/*"
            handleChange={handleChangeInputFile}
          />

          <button
            type="submit"
            variant="primary"
            width="button-form"
            disabled={buttonDisabled}>
            Crear
          </button>
        </form>
      )}

      {/* {showModal && (
          <ErrorModal
            title="Anuncio"
            message={"Acabas de crear un nuevo anuncio"}
            onCancel={handleShowModal}
          />
        )} */}

      {error && (
        <ErrorModal
          title="Error"
          message={error.message}
          onCancel={handleErrorClick}
        />
      )}
    </Layout>
  );
}

export default AdNew;
