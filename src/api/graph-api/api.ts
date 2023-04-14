/* tslint:disable */
/* eslint-disable */
/**
 * 
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface NodeIdDto
 */
export interface NodeIdDto {
    /**
     * 
     * @type {string}
     * @memberof NodeIdDto
     */
    'type': NodeIdDtoTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof NodeIdDto
     */
    'id': number;
}

/**
    * @export
    * @enum {string}
    */
export enum NodeIdDtoTypeEnum {
    Event = 'EVENT',
    Chara = 'CHARA',
    Scene = 'SCENE'
}

/**
 * 
 * @export
 * @interface RelationEntity
 */
export interface RelationEntity {
    /**
     * 
     * @type {string}
     * @memberof RelationEntity
     */
    'label': RelationEntityLabelEnum;
    /**
     * 
     * @type {string}
     * @memberof RelationEntity
     */
    'identity': string;
    /**
     * 
     * @type {string}
     * @memberof RelationEntity
     */
    'start': string;
    /**
     * 
     * @type {string}
     * @memberof RelationEntity
     */
    'end': string;
    /**
     * 
     * @type {RelationProperty}
     * @memberof RelationEntity
     */
    'properties': RelationProperty;
}

/**
    * @export
    * @enum {string}
    */
export enum RelationEntityLabelEnum {
    HappenedAfter = 'HAPPENED_AFTER',
    LedTo = 'LED_TO',
    Affected = 'AFFECTED',
    Includes = 'INCLUDES',
    OccurredIn = 'OCCURRED_IN',
    HasRelationship = 'HAS_RELATIONSHIP',
    ParticipatedIn = 'PARTICIPATED_IN',
    Contains = 'CONTAINS'
}

/**
 * 
 * @export
 * @interface RelationIdDto
 */
export interface RelationIdDto {
    /**
     * 
     * @type {string}
     * @memberof RelationIdDto
     */
    'type': RelationIdDtoTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof RelationIdDto
     */
    'from'?: number;
    /**
     * 
     * @type {number}
     * @memberof RelationIdDto
     */
    'to'?: number;
}

/**
    * @export
    * @enum {string}
    */
export enum RelationIdDtoTypeEnum {
    HappenedAfter = 'HAPPENED_AFTER',
    LedTo = 'LED_TO',
    Affected = 'AFFECTED',
    Includes = 'INCLUDES',
    OccurredIn = 'OCCURRED_IN',
    HasRelationship = 'HAS_RELATIONSHIP',
    ParticipatedIn = 'PARTICIPATED_IN',
    Contains = 'CONTAINS'
}

/**
 * 
 * @export
 * @interface RelationProperty
 */
export interface RelationProperty {
    /**
     * 
     * @type {number}
     * @memberof RelationProperty
     */
    'projectId': number;
}
/**
 * 
 * @export
 * @interface Relations
 */
export interface Relations {
    /**
     * 
     * @type {Array<number>}
     * @memberof Relations
     */
    'from': Array<number>;
    /**
     * 
     * @type {Array<number>}
     * @memberof Relations
     */
    'to': Array<number>;
}
/**
 * 
 * @export
 * @interface RelationsEntity
 */
export interface RelationsEntity {
    /**
     * 
     * @type {RelationsEntityHAPPENEDAFTER}
     * @memberof RelationsEntity
     */
    'HAPPENED_AFTER': RelationsEntityHAPPENEDAFTER;
    /**
     * 
     * @type {RelationsEntityHAPPENEDAFTER}
     * @memberof RelationsEntity
     */
    'LED_TO': RelationsEntityHAPPENEDAFTER;
    /**
     * 
     * @type {RelationsEntityHAPPENEDAFTER}
     * @memberof RelationsEntity
     */
    'AFFECTED': RelationsEntityHAPPENEDAFTER;
    /**
     * 
     * @type {RelationsEntityHAPPENEDAFTER}
     * @memberof RelationsEntity
     */
    'INCLUDES': RelationsEntityHAPPENEDAFTER;
    /**
     * 
     * @type {RelationsEntityHAPPENEDAFTER}
     * @memberof RelationsEntity
     */
    'OCCURRED_IN': RelationsEntityHAPPENEDAFTER;
    /**
     * 
     * @type {RelationsEntityHAPPENEDAFTER}
     * @memberof RelationsEntity
     */
    'HAS_RELATIONSHIP': RelationsEntityHAPPENEDAFTER;
    /**
     * 
     * @type {RelationsEntityHAPPENEDAFTER}
     * @memberof RelationsEntity
     */
    'PARTICIPATED_IN': RelationsEntityHAPPENEDAFTER;
    /**
     * 
     * @type {RelationsEntityHAPPENEDAFTER}
     * @memberof RelationsEntity
     */
    'CONTAINS': RelationsEntityHAPPENEDAFTER;
}
/**
 * 
 * @export
 * @interface RelationsEntityHAPPENEDAFTER
 */
export interface RelationsEntityHAPPENEDAFTER {
    /**
     * 
     * @type {Array<number>}
     * @memberof RelationsEntityHAPPENEDAFTER
     */
    'from': Array<number>;
    /**
     * 
     * @type {Array<number>}
     * @memberof RelationsEntityHAPPENEDAFTER
     */
    'to': Array<number>;
}

/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {NodeIdDto} nodeIdDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createNode: async (nodeIdDto: NodeIdDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'nodeIdDto' is not null or undefined
            assertParamExists('createNode', 'nodeIdDto', nodeIdDto)
            const localVarPath = `/node`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(nodeIdDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {RelationIdDto} relationIdDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createRelation: async (relationIdDto: RelationIdDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'relationIdDto' is not null or undefined
            assertParamExists('createRelation', 'relationIdDto', relationIdDto)
            const localVarPath = `/relation`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(relationIdDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {'EVENT' | 'CHARA' | 'SCENE'} type 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getRelations: async (type: 'EVENT' | 'CHARA' | 'SCENE', id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'type' is not null or undefined
            assertParamExists('getRelations', 'type', type)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getRelations', 'id', id)
            const localVarPath = `/relations`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (type !== undefined) {
                localVarQueryParameter['type'] = type;
            }

            if (id !== undefined) {
                localVarQueryParameter['id'] = id;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTest: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/test`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {NodeIdDto} nodeIdDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeNode: async (nodeIdDto: NodeIdDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'nodeIdDto' is not null or undefined
            assertParamExists('removeNode', 'nodeIdDto', nodeIdDto)
            const localVarPath = `/node`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(nodeIdDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {RelationIdDto} relationIdDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeRelation: async (relationIdDto: RelationIdDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'relationIdDto' is not null or undefined
            assertParamExists('removeRelation', 'relationIdDto', relationIdDto)
            const localVarPath = `/relation`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(relationIdDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {NodeIdDto} nodeIdDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createNode(nodeIdDto: NodeIdDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createNode(nodeIdDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {RelationIdDto} relationIdDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createRelation(relationIdDto: RelationIdDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<RelationEntity>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createRelation(relationIdDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {'EVENT' | 'CHARA' | 'SCENE'} type 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getRelations(type: 'EVENT' | 'CHARA' | 'SCENE', id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RelationsEntity>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getRelations(type, id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTest(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getTest(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {NodeIdDto} nodeIdDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async removeNode(nodeIdDto: NodeIdDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.removeNode(nodeIdDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {RelationIdDto} relationIdDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async removeRelation(relationIdDto: RelationIdDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<RelationEntity>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.removeRelation(relationIdDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * 
         * @param {DefaultApiCreateNodeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createNode(requestParameters: DefaultApiCreateNodeRequest, options?: AxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.createNode(requestParameters.nodeIdDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {DefaultApiCreateRelationRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createRelation(requestParameters: DefaultApiCreateRelationRequest, options?: AxiosRequestConfig): AxiosPromise<Array<RelationEntity>> {
            return localVarFp.createRelation(requestParameters.relationIdDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {DefaultApiGetRelationsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getRelations(requestParameters: DefaultApiGetRelationsRequest, options?: AxiosRequestConfig): AxiosPromise<RelationsEntity> {
            return localVarFp.getRelations(requestParameters.type, requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTest(options?: AxiosRequestConfig): AxiosPromise<string> {
            return localVarFp.getTest(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {DefaultApiRemoveNodeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeNode(requestParameters: DefaultApiRemoveNodeRequest, options?: AxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.removeNode(requestParameters.nodeIdDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {DefaultApiRemoveRelationRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeRelation(requestParameters: DefaultApiRemoveRelationRequest, options?: AxiosRequestConfig): AxiosPromise<Array<RelationEntity>> {
            return localVarFp.removeRelation(requestParameters.relationIdDto, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createNode operation in DefaultApi.
 * @export
 * @interface DefaultApiCreateNodeRequest
 */
export interface DefaultApiCreateNodeRequest {
    /**
     * 
     * @type {NodeIdDto}
     * @memberof DefaultApiCreateNode
     */
    readonly nodeIdDto: NodeIdDto
}

/**
 * Request parameters for createRelation operation in DefaultApi.
 * @export
 * @interface DefaultApiCreateRelationRequest
 */
export interface DefaultApiCreateRelationRequest {
    /**
     * 
     * @type {RelationIdDto}
     * @memberof DefaultApiCreateRelation
     */
    readonly relationIdDto: RelationIdDto
}

/**
 * Request parameters for getRelations operation in DefaultApi.
 * @export
 * @interface DefaultApiGetRelationsRequest
 */
export interface DefaultApiGetRelationsRequest {
    /**
     * 
     * @type {'EVENT' | 'CHARA' | 'SCENE'}
     * @memberof DefaultApiGetRelations
     */
    readonly type: 'EVENT' | 'CHARA' | 'SCENE'

    /**
     * 
     * @type {number}
     * @memberof DefaultApiGetRelations
     */
    readonly id: number
}

/**
 * Request parameters for removeNode operation in DefaultApi.
 * @export
 * @interface DefaultApiRemoveNodeRequest
 */
export interface DefaultApiRemoveNodeRequest {
    /**
     * 
     * @type {NodeIdDto}
     * @memberof DefaultApiRemoveNode
     */
    readonly nodeIdDto: NodeIdDto
}

/**
 * Request parameters for removeRelation operation in DefaultApi.
 * @export
 * @interface DefaultApiRemoveRelationRequest
 */
export interface DefaultApiRemoveRelationRequest {
    /**
     * 
     * @type {RelationIdDto}
     * @memberof DefaultApiRemoveRelation
     */
    readonly relationIdDto: RelationIdDto
}

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * 
     * @param {DefaultApiCreateNodeRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public createNode(requestParameters: DefaultApiCreateNodeRequest, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).createNode(requestParameters.nodeIdDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {DefaultApiCreateRelationRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public createRelation(requestParameters: DefaultApiCreateRelationRequest, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).createRelation(requestParameters.relationIdDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {DefaultApiGetRelationsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public getRelations(requestParameters: DefaultApiGetRelationsRequest, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).getRelations(requestParameters.type, requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public getTest(options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).getTest(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {DefaultApiRemoveNodeRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public removeNode(requestParameters: DefaultApiRemoveNodeRequest, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).removeNode(requestParameters.nodeIdDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {DefaultApiRemoveRelationRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public removeRelation(requestParameters: DefaultApiRemoveRelationRequest, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).removeRelation(requestParameters.relationIdDto, options).then((request) => request(this.axios, this.basePath));
    }
}


