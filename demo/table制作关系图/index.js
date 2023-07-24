/*
 * @Author: luoyaooo
 * @Date: 2022-02-18 14:44:24
 * @LastEditors: luoyaooo
 * @LastEditTime: 2022-02-23 16:53:46
 */
const app = new Vue({
    el: "#app",
    data() {
        return {
            position: {
                top: 40,
                left: 40,
            },
            minWidth: 800,
            data: [
                {
                    name: "梦想投资公司",
                    type: "root",
                    fold: false, // 是否折叠
                    nodeList: [
                        {
                            nodeName: "触",
                            nodeId: "mm-diagram-node-1",
                            isEnd: false,
                            isStart: false,
                        },
                    ],
                    parent: [
                        {
                            name: "销售管理",
                            type: "parent",
                            fold: false, // 是否折叠
                            nodeList: [
                                {
                                    nodeName: "触",
                                    nodeId: "mm-diagram-node-1",
                                    isEnd: false,
                                    isStart: false,
                                },
                            ],
                            children: [
                                {
                                    name: "销售订单",
                                    type: "child",
                                    nodeList: [
                                        {
                                            nodeName: "触",
                                            nodeId: "mm-diagram-node-1",
                                            isEnd: false,
                                            isStart: true,
                                        },
                                    ],
                                },
                                {
                                    name: "销售发票",
                                    type: "third",
                                    nodeList: [
                                        {
                                            nodeName: "",
                                            nodeId: "mm-diagram-node-1",
                                            isEnd: true,
                                            isStart: false,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
            BizResourceHandler: [
                "BizResource-form-BizFormResourceHandlerImpl",
                "BizResource-bpm-BizBpmResourceHandlerImpl",
                "BizResource-mapbusiness-BizMapBusinessResourceHandlerImpl",
                "BizResource-orgmodule-BizOrgModuleResourceHandlerImpl",
                "BizResource-access-BizSysAccessResourceHandlerImpl",
            ],
            outerHandlerName: [
                // "BizLogic-form-BizFormTriggerLogicHandlerImpl", // "单据触发单据",
                // "BizLogic-access-BizSysAccessTriggerToFormHandlerImpl", // "集成触发单据",
                // "BizLogic-form-BizFormQuoteLogicHandlerImpl", // "引用",
                // "BizLogic-affair-BizAffairMessageLogicHandlerImpl", // "触发消息",
                // "BizLogic-access-BizSysAccessTriggerFromFormHandlerImpl", // "单据触发集成",
                // "BizLogic-mapbusiness-BizMapBusinessTriggerToFormHandlerImpl", // "地图触发单据",
                // "BizLogic-mapbusiness-BizMapBusinessTriggerFromFormHandlerImpl", // "单据触发地图",
                // "BizLogic-bpm-BizBpmTriggerFromFormLogicHandlerImpl", // "单据触发流程",
                // "BizLogic-bpm-BizBpmTriggerFromBpmLogicHandlerImpl", // "流程触发流程",
                // "BizLogic-access-BizSysAccessTriggerToMapBusinessHandlerImpl", // "集成触发地图",
                // "BizLogic-schedule-BizScheduleRemindLogicHandlerImpl", // "单据触发日程",
                "BizLogic-bizorgouter-BizOrgOuterFormQuoteLogicHandlerImpl", // "引用（跨组织）",
                "BizLogic-bizorgouter-BizOrgOuterFormTriggerLogicHandlerImpl", // "单据触发单据（跨组织）",
                // "BizLogic-orgmodule-BizOrgModuleTriggerFromFormLogicHandlerImpl", // "触发组织机构",
            ],
            lines: [],
            linesActive: -1, // 高亮的关系线
        };
    },
    computed: {
        horizontalStyle() {
            return {
                minWidth: this.minWidth + "px",
            };
        },
    },
    methods: {
        clickFold(obj) {
            this.$set(obj, "fold", !obj.fold);
            this.$nextTick(() => {
                // this.drawLine();
            });
        },
        initData() {
            let treeObj = {};
            let parentObj = {};
            let treeArr = [];
            let copyData = JSON.parse(JSON.stringify(treeData));
            treeData.forEach((n) => {
                let system = JSON.parse(n.system);
                if (!treeObj[system.id]) {
                    let root = {
                        id: system.code,
                        name: system.name,
                        type: "root",
                        fold: false,
                        nodeList: [],
                        parent: [
                            {
                                id: n.trueBizId,
                                name: n.group,
                                type: "parent",
                                nodeList: [],
                                children: [],
                            },
                        ],
                    };
                    let children = this.getChildren(copyData, n, system);
                    children.forEach((c) => {
                        root.parent[0].children.push({
                            id: c.id,
                            name: c.showName,
                            type: "child",
                            nodeList: [],
                        });
                    });
                    treeArr.push(root);
                    treeObj[system.id] = { index: treeArr.length - 1 };
                    parentObj[`${n.group}${system.id}`] = true;
                } else if (!parentObj[`${n.group}${system.id}`]) {
                    let root = treeArr[treeObj[system.id].index];
                    root.parent.push({
                        id: n.trueBizId,
                        name: n.group,
                        type: "parent",
                        nodeList: [],
                        children: [],
                    });
                    let children = this.getChildren(copyData, n, system);
                    children.forEach((c) => {
                        root.parent[root.parent.length - 1].children.push({
                            id: c.id,
                            name: c.showName,
                            type: "child",
                            nodeList: [],
                        });
                    });
                    parentObj[`${n.group}${system.id}`] = true;
                }
            });
            // console.log(parentObj);
            // console.log(treeArr);
            // const nodeDataCopy = JSON.parse(JSON.stringify(nodeData));
            const nodeDataCopy = nodeData;
            treeArr.forEach((tree) => {
                tree.parent.forEach((p) => {
                    p.children.forEach((c) => {
                        nodeDataCopy.forEach((n) => {
                            if (c.id === n.resourceIn) {
                                // 起点
                                c.nodeList.push({
                                    ...n,
                                    isEnd: false,
                                    isStart: true,
                                });
                                n.rootInId = tree.id;
                                n.parentInId = p.id;
                            } else if (c.id === n.resourceOut) {
                                // 终点
                                c.nodeList.push({
                                    ...n,
                                    isEnd: true,
                                    isStart: false,
                                });
                                n.rootOutId = tree.id;
                                n.parentOutId = p.id;
                            } else {
                                c.nodeList.push({});
                            }
                        });
                    });
                    nodeDataCopy.forEach((n) => {
                        if (
                            (n.parentInId === p.id || n.parentOutId === p.id) &&
                            n.parentOutId !== n.parentInId &&
                            n.handlerName !==
                                "BizLogic-affair-BizAffairMessageLogicHandlerImpl"
                        ) {
                            p.nodeList.push({
                                ...n,
                                isEnd: n.parentOutId === p.id,
                            });
                        } else {
                            p.nodeList.push({});
                        }
                    });
                });
                nodeDataCopy.forEach((n) => {
                    if (
                        (n.rootInId === tree.id || n.rootOutId === tree.id) &&
                        n.rootInId !== n.rootOutId &&
                        n.handlerName !==
                            "BizLogic-affair-BizAffairMessageLogicHandlerImpl"
                    ) {
                        tree.nodeList.push({
                            ...n,
                            isEnd: n.rootOutId === tree.id,
                        });
                    } else {
                        tree.nodeList.push({});
                    }
                });
            });
            this.data = treeArr;
            this.$nextTick(() => {
                this.drawLine();
            });
        },
        getChildren(copyData, n, system) {
            let children = copyData.filter((item) => {
                let _system = JSON.parse(item.system);
                return item.group === n.group && system.id === _system.id;
            });
            let newForms = {
                forms: [],
                bpms: [],
                maps: [],
                org: [],
                access: [],
                others: [],
            };
            for (let i = 0; i < children.length; i++) {
                if (children[i].handlerName == this.BizResourceHandler[0]) {
                    newForms.forms.push(children[i]);
                } else if (
                    children[i].handlerName == this.BizResourceHandler[1]
                ) {
                    newForms.bpms.push(children[i]);
                } else if (
                    children[i].handlerName == this.BizResourceHandler[2]
                ) {
                    newForms.maps.push(children[i]);
                } else if (
                    children[i].handlerName == this.BizResourceHandler[3]
                ) {
                    newForms.org.push(children[i]);
                } else if (
                    children[i].handlerName == this.BizResourceHandler[4]
                ) {
                    newForms.access.push(children[i]);
                } else {
                    newForms.others.push(children[i]);
                }
            }
            return newForms.forms.concat(
                newForms.bpms,
                newForms.maps,
                newForms.org,
                newForms.access,
                newForms.others
            );
        },
        drawLine() {
            this.lines = [];
            let scrollTop = this.$refs["mmDiagramWrapHook"].scrollTop;
            let scrollLeft = this.$refs["mmDiagramWrapHook"].scrollLeft;
            nodeData.forEach((n) => {
                let doms = this.$refs[n.id].filter((d) => {
                    return d.dataset.anchor;
                });
                if (!doms.length) return;
                let position1 = doms[0].getBoundingClientRect(),
                    position2 = doms[1] ? doms[1].getBoundingClientRect() : "",
                    point1 = {},
                    point2 = {},
                    domsPosition = [position1, position2],
                    lineStyle = {};
                // 关系点内容
                point1 = this.getPointObj(doms[0], n);
                point2 = this.getPointObj(doms[1], n);

                // 关系线样式
                if (position2) {
                    // 有两个节点
                    lineStyle = {
                        height: `${Math.abs(
                            domsPosition[0].top - domsPosition[1].top
                        )}px`,
                        left: `${
                            domsPosition[0].left -
                            this.position.left +
                            domsPosition[0].width / 2 +
                            scrollLeft
                        }px`,
                    };
                    if (domsPosition[0].top < domsPosition[1].top) {
                        // 以第一个点作为顶部
                        lineStyle.top = `${
                            domsPosition[0].top -
                            this.position.top +
                            scrollTop +
                            domsPosition[0].height / 2
                        }px`;
                    } else {
                        // 以第二个点作为 应该是不会出现这种情况吧
                        lineStyle.top = `${
                            domsPosition[1].top -
                            this.position.top +
                            scrollTop +
                            domsPosition[0].height / 2
                        }px`;
                    }
                } else if (
                    n.handlerName ===
                    "BizLogic-affair-BizAffairMessageLogicHandlerImpl"
                ) {
                    lineStyle = {
                        height: `40px`,
                        left: `${
                            domsPosition[0].left -
                            this.position.left +
                            domsPosition[0].width / 2 +
                            scrollLeft
                        }px`,
                        top: `${
                            domsPosition[0].top -
                            this.position.top +
                            scrollTop +
                            domsPosition[0].height / 2
                        }px`,
                    };
                    console.log(n);
                    // 一个节点的业务关系 如：触发消息
                }

                this.lines.push({ point1, point2, lineStyle, nodeData: n });
            });
            console.log(this.lines);
        },
        getPointObj(pDom, nodeData) {
            let point = {};
            if (pDom) {
                if (pDom.dataset.end) {
                    point.isEnd = true;
                    if (nodeData.logicType === "Quote") {
                        point.text = "引";
                    }
                } else if (
                    nodeData.logicType === "Trigger" &&
                    nodeData.handlerName !==
                        "BizLogic-affair-BizAffairMessageLogicHandlerImpl"
                ) {
                    point.text = "触";
                } else if (
                    nodeData.handlerName ===
                    "BizLogic-affair-BizAffairMessageLogicHandlerImpl"
                ) {
                    point.text = "触";
                    point.subText = "消息";
                    console.log(point);
                }
            }
            return point;
        },
        nameClick(item) {
            this.$set(item, "highlight", !item.highlight);
        },
        clickLine(index) {
            console.log(index);
            if (index === this.linesActive) {
                // 取消高亮
                this.linesActive = -1;
            } else {
                this.linesActive = index;
            }
        },
    },
    mounted() {
        this.initData();
    },
});
