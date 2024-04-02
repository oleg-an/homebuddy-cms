const errorText =
  'It is forbidden to use hooks inside of table cells and table headers. Please move your content to a separate component and import it here';

const nodeHandler = (node, context) => {
  const isHook = node.name.includes('use') && node.name[3] && node.name[3] === node.name[3].toUpperCase();

  if (!isHook) {
    return;
  }

  context.report({
    node: node,
    message: errorText,
  });
};

module.exports = {
  create(context) {
    return {
      "ObjectExpression Property[key.name='columnCell'] Identifier":
        (node) => nodeHandler(node, context),
      "ObjectExpression Property[key.name='headerCell'] Identifier":
        (node) => nodeHandler(node, context),
    };
  },
};
