import { METHODS, requestApi, URL } from "..";
import {responseHandler} from "../util/responseHandler";
import {Member} from "../../components/CreateEditViewMember";

export const editExistingMember = async (memberUUID: string, body: Member) => {
    return responseHandler(await requestApi(METHODS.PATCH, URL.EDIT_EXISTING_MEMBER(memberUUID), body));
}