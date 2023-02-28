import type { NodeProperty } from './entities/node/node.entity'
import type { RelationProperty } from './entities/relation/relation.entity'

// node type

export const EVENT = 'EVENT' // 事件
export const CHARA = 'CHARA' // 角色
export const SCENE = 'SCENE' // 场景

// event to event

export const SUB_TO = 'SUB_TO' // 顺承
export const LEAD_TO = 'LEAD_TO' // 因果
export const AFFECT = 'AFFECT' // 影响
export const CONTAINS = 'CONTAINS' // 包含

// event to scene

export const HAPPEN_IN = 'HAPPEN_IN' // 发生在

// chara to chara

export const CHARA_RELATE_TO = 'CHARA_RELATE_TO' // 角色关系

// chara to event

export const CHARA_JOIN_IN = 'JOIN_IN' // 参与

// scene to scene

export const SCENE_CONTAINS = 'SCENE_CONTAINS' // 场景包含

// type

export declare const EventRelation: {
  SUB_TO: 'SUB_TO'
  LEAD_TO: 'LEAD_TO'
  AFFECT: 'AFFECT'
  CONTAINS: 'CONTAINS'
}
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type EventRelation = typeof EventRelation[keyof typeof EventRelation]

export declare const NodeType: {
  EVENT: 'EVENT'
  CHARA: 'CHARA'
  SCENE: 'SCENE'
}
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type NodeType = typeof NodeType[keyof typeof NodeType]
export type NodeIdentifier = NodeProperty & { label: NodeType }

export declare const RelationType: {
  SUB_TO: 'SUB_TO'
  LEAD_TO: 'LEAD_TO'
  AFFECT: 'AFFECT'
  CONTAINS: 'CONTAINS'
  HAPPEN_IN: 'HAPPEN_IN'
  CHARA_RELATE_TO: 'CHARA_RELATE_TO'
  CHARA_JOIN_IN: 'CHARA_JOIN_IN'
  SCENE_CONTAINS: 'SCENE_CONTAINS'
}
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type RelationType = typeof RelationType[keyof typeof RelationType]
export type RelationIdentifier = RelationProperty & { label: RelationType }
