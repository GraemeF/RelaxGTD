var TaskRepository = function (eventStore, eventPublisher) {
    this.eventStore = eventStore;
    this.eventPublisher = eventPublisher;
};

TaskRepository.prototype.store = function (task) {
    this.eventStore.append(task.uncommittedEvents);
    this.eventPublisher.publish(task.uncommittedEvents);
    task.uncommittedEvents = [];
};

module.exports = TaskRepository;