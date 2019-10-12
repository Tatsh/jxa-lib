type OS_dispatch_queue = {};
type OS_dispatch_semaphore = {};

interface dispatch_queue_global_t extends NSObject<OS_dispatch_queue> {}
interface dispatch_queue_t extends NSObject<OS_dispatch_queue> {}
interface dispatch_semaphore_t extends NSObject<OS_dispatch_semaphore> {}
