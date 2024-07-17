import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  Modal,
  Typography,
  IconButton,
  DialogTitle,
  Input,
} from "@mui/material";
import ReactSelect from "react-select";
import chroma from "chroma-js";
import CustomTextField from "../../components/CustomTextField";
import { StaggeredLabel } from "../../components/StaggerdLabel";
import CloseIcon from "@mui/icons-material/Close";
import { StylesConfig } from "react-select";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Loader from "components/Loader";
import { toast, ToastContainer } from "react-toastify";
import {
  useGetProductsQuery,
  useEditProductMutation,
  useAddProductMutation,
} from "store/apiSlice";

type Size = {
  value: string;
  label: string;
};
type Props = {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  editData?: any;
  setEditData?: (data: object | null) => void;
};
const predefinedColors = [
  { value: "#FF0000", label: "Red" },
  { value: "#00FF00", label: "Green" },
  { value: "#0000FF", label: "Blue" },
  { value: "#FFFF00", label: "Yellow" },
  { value: "#FFA500", label: "Orange" },
  { value: "#800080", label: "Purple" },
  { value: "#00FFFF", label: "Cyan" },
  { value: "#FFC0CB", label: "Pink" },
  { value: "#A52A2A", label: "Brown" },
  { value: "#808080", label: "Gray" },
  { value: "#000000", label: "Black" },
  { value: "#FFFFFF", label: "White" },
  { value: "#FFD700", label: "Gold" },
  { value: "#008000", label: "Dark Green" },
  { value: "#00008B", label: "Dark Blue" },
  { value: "#8B0000", label: "Dark Red" },
  { value: "#4B0082", label: "Indigo" },
  { value: "#EE82EE", label: "Violet" },
  { value: "#ADFF2F", label: "Green Yellow" },
  { value: "#FA8072", label: "Salmon" },
  { value: "#D2691E", label: "Chocolate" },
  { value: "#FFE4C4", label: "Bisque" },
  { value: "#4682B4", label: "Steel Blue" },
  { value: "#D3D3D3", label: "Light Gray" },
  { value: "#87CEEB", label: "Sky Blue" },
  { value: "#40E0D0", label: "Turquoise" },
  { value: "#FF6347", label: "Tomato" },
  { value: "#708090", label: "Slate Gray" },
  { value: "#6A5ACD", label: "Slate Blue" },
];
interface ColourOption {
  readonly value: string;
  readonly label: string;
}
const colourStyles: StylesConfig<ColourOption, true> = {
  control: (styles: any, { isFocused }) => ({
    ...styles,
    backgroundColor: "white",
    borderColor: "var(--primary)",
    boxShadow: isFocused ? "0 0 0 0.5px var(--secondary)" : "none",
    "&:hover": {
      borderColor: "var(--primary)",
    },
  }),
  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    const color = chroma(data.value);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.value
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.value,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor:
          !isDisabled && (isSelected ? data.value : color.alpha(0.3).css()),
      },
    };
  },
  multiValue: (styles: any, { data }: any) => {
    const color = chroma(data.value);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles: any, { data }: any) => ({
    ...styles,
    color: data.value,
  }),
  multiValueRemove: (styles: any, { data }: any) => ({
    ...styles,
    color: data.value,
    ":hover": {
      backgroundColor: data.value,
      color: "white",
    },
  }),
  dropdownIndicator: (styles: any, { isFocused }: any) => ({
    ...styles,
    color: isFocused ? "var(--secondary)" : "var(--primary)",
    "&:hover": {
      color: "var(--secondary)",
    },
  }),
  clearIndicator: (styles: any) => ({
    ...styles,
    color: "var(--primary)",
    "&:hover": {
      color: "var(--secondary)",
    },
  }),
};

const customStyles = {
  control: (provided: any, state: any) => {
    const { isFocused } = state;
    return {
      ...provided,
      backgroundColor: "white",
      borderColor: "var(--primary)",
      boxShadow: isFocused ? "0 0 0 0.5px var(--secondary)" : "none",
      "&:hover": {
        borderColor: "var(--primary)",
      },
    };
  },
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? "var(--secondary)" : "var(--primary)",
    "&:hover": {
      color: "var(--secondary)",
    },
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    color: "var(--primary)",
    "&:hover": {
      color: "var(--secondary)",
    },
  }),
  option: (provided: any, state: any) => {
    const isSelected = state.isSelected;
    const isFocused = state.isFocused;
    return {
      ...provided,
      backgroundColor: isSelected
        ? "var(--primary)"
        : isFocused
        ? "var(--secondary)"
        : "white",
      color: isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: "var(--secondary-200)",
        color: "var(--text-900)",
      },
    };
  },
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "white",
  }),
};

const Sizes = [
  { label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "XXL", value: "XXL" },
];
const categoryOptions = [
  "Dresses",
  "Tops",
  "Bottoms",
  "Outerwear",
  "Accessories",
].map((option) => ({
  value: option,
  label: option,
}));

const AddProduct: React.FC<Props> = ({
  open,
  setOpen,
  editData,
  setEditData,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [category, setCategory] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [addProduct] = useAddProductMutation();
  const [editProduct] = useEditProductMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [colors, setColors] = useState<{ value: string; label: string }[]>([]);
  const [errors, setErrors] = useState<any>({
    name: { error: false, message: "" },
    description: { error: false, message: "" },
    category: { error: false, message: "" },
    price: { error: false, message: "" },
    stock: { error: false, message: "" },
    sizes: { error: false, message: "" },
    colors: { error: false, message: "" },
    images: { error: false, message: "" },
  });
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    Object.keys(errors).forEach((field) => {
      if (errors[field].error) {
        const timer = setTimeout(() => {
          setErrors((prevErrors: any) => ({
            ...prevErrors,
            [field]: { error: false, message: "" },
          }));
        }, 3000);
        timers.push(timer);
      }
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [errors]);

  useEffect(() => {
    if (editData != null) {
      setFormData({
        name: editData.name,
        description: editData.description,
        price: editData.price,
        stock: editData.stock,
      });
      const sizesArray = editData.sizes.map((size: string) => ({
        value: size,
        label: size,
      }));
      const colorsArray = editData.colors.map((color: string) => {
        const foundColor = predefinedColors.find((c) => c.value === color);
        return foundColor ? foundColor : { value: color, label: color };
      });
      setColors(colorsArray);
      setSizes(sizesArray);
      setImages(editData.images);
      setCategory({ value: editData.category, label: editData.category });
    }
  }, []);

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: { error: false, message: "" },
      description: { error: false, message: "" },
      category: { error: false, message: "" },
      price: { error: false, message: "" },
      stock: { error: false, message: "" },
      sizes: { error: false, message: "" },
      colors: { error: false, message: "" },
      images: { error: false, message: "" },
    };

    if (!formData.name.trim()) {
      newErrors.name = { error: true, message: "Name is required" };
      valid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = {
        error: true,
        message: "Description is required",
      };
      valid = false;
    }

    if (category == null) {
      newErrors.category = { error: true, message: "Category is required" };
      valid = false;
    }

    if (!formData.price || parseInt(formData.price) <= 0) {
      newErrors.price = {
        error: true,
        message: "Price must be a positive number",
      };
      valid = false;
    }

    if (
      !formData.stock ||
      parseInt(formData.stock) <= 0 ||
      !Number.isInteger(Number(formData.stock))
    ) {
      newErrors.stock = {
        error: true,
        message: "Stock must be a positive integer",
      };
      valid = false;
    }

    if (sizes.length < 1) {
      newErrors.sizes = {
        error: true,
        message: "Please select at least one size",
      };
      valid = false;
    }

    if (colors.length < 1) {
      newErrors.colors = {
        error: true,
        message: "Please select at least one color",
      };
      valid = false;
    }

    if (images.length < 1) {
      newErrors.images = {
        error: true,
        message: "Please upload at least one image",
      };
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  const handleImageUpload = async () => {
    const uploadPromises = images.map((image) => {
      const storageRef = ref(storage, `products/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      return new Promise<string>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
          }
        );
      });
    });

    return Promise.all(uploadPromises);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);
    }
  };
  const { refetch } = useGetProductsQuery(undefined);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const imageUrls = await handleImageUpload();
        const payload = {
          name: formData.name,
          description: formData.description,
          category: category?.value,
          price: Number(formData.price),
          stock: Number(formData.stock),
          sizes: sizes.map((color) => color.value),
          images: imageUrls,
          colors: colors.map((color) => color.value),
        };

        let response;

        response = editData != null ? await editProduct({id:editData._id,data:payload}) : await addProduct(payload);
        setLoading(false);
        handleClose();
        refetch();
        toast.success(response?.data?.message);
      } catch (error) {
        setLoading(false);
        handleClose();
        toast.error("something went wrong, please try again");
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, selectedOptions: any) => {
    switch (name) {
      case "category":
        setCategory(selectedOptions);
        break;
      case "sizes":
        setSizes(selectedOptions);
        break;
      case "colors":
        setColors(selectedOptions);
        break;
      default:
        break;
    }
  };
  const handleClose = () => {
    setOpen(false);
    if (setEditData) {
      setEditData(null);
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        {loading && <Loader />}
        <div className="container mx-auto bg-white p-6 rounded-lg w-4/5 sm:w-full">
          <DialogTitle
            id="modal-modal-title"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              "& .MuiTypography-root": {
                flex: "1 1 auto",
              },
              "& .MuiIconButton-root": {
                flex: "0 0 auto",
                marginLeft: "auto",
              },
            }}
            className="bg-background bg"
          >
            <Typography variant="h6">Add New Product</Typography>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 overflow-auto max-h-96"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <CustomTextField
                label={<StaggeredLabel text="Product Name" />}
                variant="outlined"
                size="small"
                type="text"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name.error}
                helperText={errors.name.message}
              />
              <div>
                <ReactSelect
                  options={categoryOptions}
                  value={category}
                  onChange={(selectedOptions) =>
                    handleSelectChange("category", selectedOptions)
                  }
                  className="z-50"
                  styles={customStyles}
                />
                {errors.category.error && (
                  <Typography
                    variant="body2"
                    sx={{
                      margin: "4px 14px 0px 14px",
                      color: "var(--accent-500)",
                      fontSize: "0.75rem",
                      fontWeight: 400,
                    }}
                  >
                    {errors.category.message}
                  </Typography>
                )}
              </div>
              <CustomTextField
                label={<StaggeredLabel text="Price" />}
                variant="outlined"
                size="small"
                type="number"
                fullWidth
                className="z-0"
                name="price"
                value={formData.price}
                onChange={handleChange}
                error={errors.price.error}
                helperText={errors.price.message}
              />

              <CustomTextField
                label={<StaggeredLabel text="Stock" />}
                variant="outlined"
                size="small"
                type="number"
                fullWidth
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                error={errors.stock.error}
                helperText={errors.stock.message}
              />
              <div>
                <ReactSelect
                  isMulti
                  options={Sizes}
                  value={sizes}
                  onChange={(selectedOptions) =>
                    handleSelectChange("sizes", selectedOptions)
                  }
                  className="basic-multi-select z-40"
                  classNamePrefix="select"
                  styles={customStyles}
                />
                {errors.sizes.error && (
                  <Typography
                    variant="body2"
                    sx={{
                      margin: "4px 14px 0px 14px",
                      color: "var(--accent-500)",
                      fontSize: "0.75rem",
                      fontWeight: 400,
                    }}
                  >
                    {errors.sizes.message}
                  </Typography>
                )}
              </div>
              <div>
                <ReactSelect
                  isMulti
                  options={predefinedColors}
                  value={colors}
                  onChange={(selectedOptions) =>
                    handleSelectChange("colors", selectedOptions)
                  }
                  className="basic-multi-select z-30"
                  classNamePrefix="select Colors"
                  styles={colourStyles}
                />
                {errors.colors.error && (
                  <Typography
                    variant="body2"
                    sx={{
                      margin: "4px 14px 0px 14px",
                      color: "var(--accent-500)",
                      fontSize: "0.75rem",
                      fontWeight: 400,
                    }}
                  >
                    {errors.colors.message}
                  </Typography>
                )}
              </div>
              <CustomTextField
                label={<StaggeredLabel text="Description" />}
                variant="outlined"
                multiline
                rows={2}
                fullWidth
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={errors.description.error}
                helperText={errors.description.message}
              />
              <div>
                <div>
                  <Typography variant="h5">Upload Images</Typography>
                  <label htmlFor="upload-button">
                    <Button
                      component="span"
                      variant="contained"
                      color="primary"
                      sx={{
                        backgroundColor: "var(--primary-500)",
                        "&:hover": {
                          backgroundColor: "var(--background-500)",
                        },
                      }}
                    >
                      Choose Files
                    </Button>
                  </label>
                  {errors.images.error && (
                    <Typography
                      variant="body2"
                      sx={{
                        margin: "4px 14px 0px 14px",
                        color: "var(--accent-500)",
                        fontSize: "0.75rem",
                        fontWeight: 400,
                      }}
                    >
                      {errors.images.message}
                    </Typography>
                  )}
                  <Input
                    id="upload-button"
                    type="file"
                    inputProps={{ multiple: true, accept: "image/*" }}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
                {images.length > 0 && (
                  <div className="mt-2 flex flex-col sm:flex-row">
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={
                          typeof image === "string"
                            ? image
                            : URL.createObjectURL(image)
                        }
                        alt={`Product Image ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg mr-2 mb-2"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Button
              variant="contained"
              className="bg-Primary-500"
              type="submit"
              fullWidth
              sx={{
                backgroundColor: "var(--primary-500)",
                "&:hover": {
                  backgroundColor: "var(--background-500)",
                },
              }}
            >
              {editData!=null?"Edit Product":"Add Product"}
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddProduct;
