import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store"; // Adjust the import according to your store location
import { entities, Entity } from "../data";
import { actions } from "../slices";

interface State<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

const createAsyncThunkAndHooks = <T>(entity: Entity) => {
    const fetchEntityData = createAsyncThunk(
        `${entity.name}/fetchData`,
        async (url: string, {dispatch}) => {
      try {
        dispatch(actions[entity.name].setLoading(true));
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        dispatch(actions[entity.name].setData(data));
      } catch (error: any) {
        dispatch(
          actions[entity.name].setError(
            error.message || "Something wrong happened"
          )
        );
      } finally {
        dispatch(actions[entity.name].setLoading(false));
      }
    }
  );

  //   try {
  //     dispatch(actions[entity.name].setLoading(true));
  //     const response = await fetch(url);
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const data = await response.json();
  //     dispatch(actions[entity.name].setData(data));
  //   } catch (error) {
  //     dispatch(actions[entity.name].setError(error.message));
  //   } finally {
  //     dispatch(actions[entity.name].setLoading(false));
  //   }

  const useEntity = () => {

    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector(
      (state: RootState) => state[entity.name] as State<any>
    );

    const fetch = (url: string) => {
     dispatch(fetchEntityData(url))
    };

    return {
      ...state,
      fetch,
    };
  };

  return {
    fetchEntityData,
    useEntity,
  };
};

const thunksAndHooks = entities.reduce((acc, entity) => {
  acc[entity.name] = createAsyncThunkAndHooks(entity);
  return acc;
}, {} as Record<string, ReturnType<typeof createAsyncThunkAndHooks>>);

// Export each thunk and hook separately
export const fetchEntityData = Object.fromEntries(
  Object.entries(thunksAndHooks).map(([key, value]) => [
    key,
    value.fetchEntityData,
  ])
);

export const useEntity = (entityName: string) => {
  const entityHook = thunksAndHooks[entityName]?.useEntity;
  if (!entityHook) {
    throw new Error(`No hook found for entity: ${entityName}`);
  }
  return entityHook();
};
