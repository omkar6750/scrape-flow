import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";

export function CreateFlowNode(
    NodeType: TaskType,
    position?: { x: number; y: number }
): AppNode {
    return {
        id: crypto.randomUUID(),
        type: "Node",
        dragHandle: ".drag-handle",
        data: {
            type: NodeType,
            inputs: {},
        },
        position: position ?? { x: 0, y: 0 },
    };
}
