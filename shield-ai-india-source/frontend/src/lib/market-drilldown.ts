import type { BudgetNode } from '../data/budget';

export function budgetPath(tree: BudgetNode[], id: string): BudgetNode[] {
  const byId = new Map(tree.map(n => [n.id, n]));
  const path: BudgetNode[] = [];
  let node = byId.get(id);
  while (node && !path.some(n => n.id === node!.id)) {
    path.unshift(node);
    node = node.parent ? byId.get(node.parent) : undefined;
  }
  return path;
}

/** Reveal relevant intermediate budgets, stopping at meaningful programme/capability nodes. */
export function smartBudgetExpansion(tree: BudgetNode[], id: string): Set<string> {
  const expanded = new Set(budgetPath(tree, id).map(n => n.id));
  const visit = (parent: string) => {
    expanded.add(parent);
    for (const child of tree.filter(n => n.parent === parent)) {
      if (child.relevant && child.drillThrough !== false && tree.some(n => n.parent === child.id)) visit(child.id);
    }
  };
  visit(id);
  return expanded;
}

export function isBudgetDescendant(tree: BudgetNode[], id: string, ancestor: string): boolean {
  return budgetPath(tree, id).some(n => n.id === ancestor);
}
