import { METHODS, requestApi, URL } from "..";
import {responseHandler} from "../util/responseHandler";

export const deleteExistingMember = async (id: string) => {
    return responseHandler(await requestApi(METHODS.DELETE, URL.DELETE_EXISTING_MEMBER(id)));
}