import {responseHandler} from "../util/responseHandler";
import {METHODS, requestApi, URL} from "../index";

export const getMembersByQuery = async (query: string) => {
    return responseHandler(await requestApi(METHODS.GET, URL.GET_MEMBERS_BY_QUERY(query)));
}