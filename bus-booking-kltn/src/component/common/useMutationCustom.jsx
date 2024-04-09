import { useMutation, useQueryClient } from "react-query";
import { useGlobalState } from "./globaleState";

const UseMutationCustom = (fc, success, error, refetch, someTodo) => {
    const { globalState, setGlobalState } = useGlobalState();
    const queryClient = useQueryClient();
    return useMutation(fc, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(refetch)
            // someTodo()
            setGlobalState({ message: success, success: true, handle: true });
            setTimeout(() => {
                setGlobalState({ message: '', success: false, handle: false });
            });
        },
        onError: (data) => {
            setGlobalState({ message: error, success: false, handle: true });
            setTimeout(() => {
                setGlobalState({ message: '', success: false, handle: false });
            });
        }
    });
};

export default UseMutationCustom;
