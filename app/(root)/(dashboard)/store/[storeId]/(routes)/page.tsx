import { GetStoreId } from "@/actions/store";

interface FormStorePage {
  params: { storeId: string };
}

interface Store {
  name: string;
  // Add other properties as needed
}

async function FormStorePage({
  params,
}: {
  params: {
    storeId: string;
  };
}) {
  const { storeId } = params;
  const store = await GetStoreId(storeId);

  // Check if store is falsy
  if (!store) {
    throw new Error("Store not found");
  }

  return <div>Active Store: {store.name}</div>;
}

export default FormStorePage;