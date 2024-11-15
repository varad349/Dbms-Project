import { METHODS, requestApi, URL } from "..";
import {responseHandler} from "../util/responseHandler";
import {Member} from "../../components/CreateEditViewMember";

export const createNewMember = async (body: Member) => {
    return responseHandler(await requestApi(METHODS.POST, URL.CREATE_NEW_MEMBER(), body));
}