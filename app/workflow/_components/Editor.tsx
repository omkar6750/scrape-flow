import { Workflow } from "@prisma/client";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./FlowEditor";
import Topbar from "./topbar/Topbar";
import TaskMenu from "./TaskMenu";
import { FLowVlidationContextProvider } from "@/components/context/FlowValidationContext";

function Editor({ workflow }: { workflow: Workflow }) {
    return (
        <FLowVlidationContextProvider>
            <ReactFlowProvider>
                <div className="flex flex-col h-full w-full overflow-hidden ">
                    <Topbar
                        workflowId={workflow.id}
                        title="Workflow Editor"
                        subtitle={workflow.name}
                    />
                    <div className="flex h-full overflow-auto">
                        <TaskMenu />
                        <FlowEditor workflow={workflow} />
                    </div>
                </div>
            </ReactFlowProvider>
        </FLowVlidationContextProvider>
    );
}

export default Editor;
