import { JsonAST } from '@vality/thrift-ts';

import type { ListType, MapType, SetType, ThriftType, ValueType } from '@vality/thrift-ts';

import { ThriftAstMetadata, PRIMITIVE_TYPES, StructureType, STRUCTURE_TYPES } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isThriftObject(value: any): boolean {
    return typeof value?.['write'] === 'function' && typeof value?.['read'] === 'function';
}

export function isComplexType(type: ValueType): type is SetType | ListType | MapType {
    return typeof type === 'object';
}

export function isPrimitiveType(type: ValueType): type is ThriftType {
    return PRIMITIVE_TYPES.includes(type as never);
}

export interface NamespaceObjectType {
    namespaceMetadata: ThriftAstMetadata;
    objectType: StructureType;
    include: JsonAST['include'];
}

export function parseNamespaceObjectType(
    metadata: ThriftAstMetadata[],
    namespace: string,
    type: string,
    include?: JsonAST['include'],
): NamespaceObjectType {
    // metadata reverse find - search for the last matching protocol if the names match (files are overwritten in the same order)
    let namespaceMetadata: ThriftAstMetadata | undefined;
    if (include) {
        namespaceMetadata = metadata.reverse().find((m) => m.path === include[namespace].path);
    }
    if (!namespaceMetadata) {
        namespaceMetadata = metadata.reverse().find((m) => m.name === namespace);
    }
    const objectType = Object.keys((namespaceMetadata as ThriftAstMetadata)?.ast ?? {}).find(
        (t) => (namespaceMetadata as ThriftAstMetadata)?.ast?.[t as keyof JsonAST]?.[type],
    ) as StructureType;
    if (!objectType || !STRUCTURE_TYPES.includes(objectType)) {
        throw new Error(`Unknown thrift structure type: ${objectType}`);
    }
    return {
        namespaceMetadata: namespaceMetadata as ThriftAstMetadata,
        objectType,
        include: {
            ...(namespaceMetadata as ThriftAstMetadata).ast.include,
            ...{ [namespace]: { path: (namespaceMetadata as ThriftAstMetadata).path } },
        },
    };
}

export interface NamespaceType<T extends ValueType = ValueType> {
    namespace: string;
    type: T;
}

export function parseNamespaceType<T extends ValueType>(
    type: T,
    namespace?: string,
): NamespaceType<T> {
    if (type && !isPrimitiveType(type) && !isComplexType(type) && type.includes('.')) {
        [namespace, type as unknown] = type.split('.');
    }
    return { namespace: namespace as string, type };
}
