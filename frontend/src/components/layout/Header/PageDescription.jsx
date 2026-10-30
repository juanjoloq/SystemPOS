function PageDescription({
    description,
    action,
}) {
    if (!description && !action) return null;

    return (
        <div className="mb-6 flex flex-col gap-4 border-b border-app pb-6 md:flex-row md:items-center md:justify-between">

            {description && (
                <p className="text-secondary">
                    {description}
                </p>
            )}

            {action && action}

        </div>
    );
}

export default PageDescription;