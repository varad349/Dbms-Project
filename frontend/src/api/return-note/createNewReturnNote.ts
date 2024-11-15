import { METHODS, requestApi, URL } from "..";
import {responseHandler} from "../util/responseHandler";
import {ReturnNote} from "../../components/Returns";

export const createNewReturnNote = async (body: ReturnNote) => {
    return responseHandler(await requestApi(METHODS.POST, URL.CREATE_NEW_RETURN_NOTE(), body));
}